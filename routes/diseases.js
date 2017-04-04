/*
    GET /app/getdiseases -> return JSON with all diseases in the system
    POST /app/adddisease -> add a new disease in the system
    POST /app/deletedisease -> delete a disease from the system
*/

const express = require('express');
const _ = require('lodash');
const router = express.Router();


var {scoreOfDisease, Disease} = require('./../server/models/diseases.js');
var {Patient} = require('./../server/models/patient.js');

/*
    GET /app/getdiseases -> return JSON with all diseases in the system, sorted alphabetically
*/
router.get('/app/getdiseases', (req, res) => {
    Disease.find({}, null, {sort: {name: 1}}).then((diseases) => {
        // Facade pattern -> make a simple JSON object, containing just the diseases names and scoreOfDisease
        //                -> to easily communicate with the frontend
        var scoreOfDiseaseJSON = {};

        if (_.isArray(diseases)) {
            for (var i = 0; i < diseases.length; ++i) {
                scoreOfDiseaseJSON[diseases[i].name] = diseases[i].score;
            }
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(scoreOfDiseaseJSON));
    }).catch((err) => {
        console.log(err);
        res.status(404).send();
    });
});

/*
    POST /app/adddisease -> add a new disease in the system
*/
router.post('/app/adddisease', (req, res) => {
    var diseaseName = req.body.diseaseName;
    var diseaseScore = req.body.diseaseScore;

    // check that the name is a String and score is a Number
    if (_.isString(diseaseName) && !_.isNaN(diseaseScore)) {
        var disease = Disease({
            name: _.capitalize(diseaseName),
            score: diseaseScore
        });

        disease.save().then((disease) => {
            console.log('Disease added');
            res.status(200).redirect('/app/systemsettings');
        }).catch((err) => {
            console.log(err);
            res.status(400).redirect('/app/systemsettings');
        });
    } else {
        res.status(400).redirect('/app/systemsettings',{messages: req.flash('success_msg', 'Succesful test') });
    }
});

/*
    POST /app/deletedisease -> delete a disease from the system
*/
router.post('/app/deletediseases', (req, res) => {
    var diseasesToDelete = req.body.DD;

    if (_.isArray(diseasesToDelete)) {
        for (var i = 0; i < diseasesToDelete.length; ++i) {
            // 1. Delete the disease from the system
            var disease = diseasesToDelete[i];
            Disease.find({
                name: diseasesToDelete[i]
            }).remove().catch((err) => {
                console.log(err);
            });

            var promise = new Promise ((resolve, reject) => {
                 resolve(disease);
                 reject(disease);
            });

            // 2. Update all patients
            Promise.all([promise.then(function (disease) { return disease; }), Patient.find({ diseases: disease })])
                 .then((data) => {
                     var diseaseToDel = data[0];
                     console.log(diseaseToDel);
                     var patients = data[1];

                     for (var i = 0; i < patients.length; ++i) {
                          var patient = patients[i];
                          var newDiseases = [];

                          // delete the diseases from the patient diseases array
                          for (var j = 0; j < patient.diseases.length; ++j)
                              if (patient.diseases[j] !== diseaseToDel) {
                                   newDiseases.push(patient.diseases[j]);
                              }

                          patient.diseases = newDiseases;
                          patient.lastUpdate = new Date().getTime();

                          patient.save().then((patient) => {
                               patient.updateScore();
                          }).catch((err) => {
                               console.log(err);
                          });
                     }
                 }).catch((err) => {
                      console.log(err);
                 });
        }
        res.status(200).redirect('/app/systemsettings');
    } else {
        console.log("POST /app/deletedisease, diseasesToDelete is not an array");
        res.status(400).redirect('/app/systemsettings');
    }
});

module.exports = router;
