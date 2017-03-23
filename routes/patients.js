/*
     POST /app/addpatient                -> add a patient in the database
     GET  /app/getpatients               -> get a JSON with all patients
     GET  /app/patient/:hospitalNumber   -> get one patiente data
     GET  /app/getpatient/:hospitalNumber-> get JSON of a patiente data
     POST /app/updatepatient/:hospitalNumber -> update disease & score for patient
     POST /app/delete/:hospitalNumber -> detele a patient from the system
*/

const express = require('express');
const _ = require('lodash');
const router = express.Router();

var {scoreOfDisease, Disease} = require('./../server/models/diseases.js');
var {Patient} = require('./../server/models/patient.js');
var {rooms, assignRoom, unassignRoom} = require('./../server/models/rooms.js');
const {ObjectID} = require('mongodb');

/*
    POST /addPatient -> add new patient
*/
router.post('/app/addpatient', (req, res) => {
    // receive the diseases from the form in the array PD, each element being a String with the disease name
    var PD = req.body.PD;
    if (_.isEmpty(PD)) {    // check if no disease is selected
        PD = [];
    }

    // Check for empty fields
    if (_.isEmpty(req.body.firstName) || _.isEmpty(req.body.lastName) || _.isEmpty(req.body.hospitalNumber)) {
        if (_.isEmpty(req.body.firstName)) req.flash('error_msg', 'Please enter the first name.');
        if (_.isEmpty(req.body.lastName)) req.flash('error_msg', 'Please enter the last name.');
        if (_.isEmpty(req.body.hospitalNumber)) req.flash('error_msg', 'Please enter the hospital number.');
        res.status(400).redirect('/app/addpatient');
    } else {
        // set the sex of the new patient
        var sex = req.body.sex;
        if (sex === "male") {
            sex = true;
        } else {
            sex = false;
        }

        // make a new patient and add it in the database
        var patient = Patient({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            sex: sex,
            hospitalNumber: req.body.hospitalNumber,
            diseases: PD
        });

        // save the patient and compute his score
        Promise.all([patient.save(), Disease.find({})])
            .then((data) => {
                var patient = data[0];
                var diseases = data[1];

                var scoreOfDisease = {};
                var score = 0;

                if (! _.isEmpty(diseases) && _.isArray(diseases)) {
                    // create a hashmap with the diseases and their scores
                    for (var i = 0; i < diseases.length; ++i) {
                        scoreOfDisease[diseases[i].name] = diseases[i].score;
                    }

                	for (var i=0; i<patient.diseases.length; ++i) {
                       if (scoreOfDisease[patient.diseases[i]] > score) {
                			score = scoreOfDisease[patient.diseases[i]];
                		}
                	}
                }

                patient.score = score;
                patient.save();
                res.status(200).redirect('/app');
            }).catch((err) => {
                console.log(err);
                res.status(400).redirect('/app');
            });
    }
});

/*
    GET /app/getpatients  -> get a JSON with all patients
*/
router.get('/app/getpatients', (req, res) => {
    Patient.find({}).then((patients) => {
        res.status(200).send(patients);
    }).catch((err) => {
        console.log(err);
        res.status(400).send();
    });
});

/*
    GET one patient data -> for his personal page
*/
router.get('/app/patient/:hospitalNumber', (req, res) => {
    hospitalNumber = req.params.hospitalNumber;
    Patient.findOne({
        hospitalNumber
    }).then((patient) => {
        if (_.isEmpty(patient)) {
            throw Error('Patient does not exist');
        }
        res.status(200).render('patientPage');
    }).catch((err) => {
        console.log(err);
        res.status(404).redirect('/app');
    });
});

/*
    GET one patient data and return it as JSON
*/
router.get('/app/getpatient/:hospitalNumber', (req, res) => {
    hospitalNumber = req.params.hospitalNumber;
    Patient.findOne({
        hospitalNumber
    }).then((patient) => {
        res.status(200).send(patient);
    }).catch((err) => {
        req.flash('error_msg', 'Please enter the first name.');
        res.status(404).redirect('/app');
    });
});

/*
    POST /app/updatepatient/:hospitalNumber -> update disease & score for patient
                                            -> request made from the patientPage
*/
router.post('/app/updatepatient/:hospitalNumber', (req, res) => {
    hospitalNumber = req.params.hospitalNumber;

    // GET form attributes
    var PD = req.body.PD;
    if (_.isEmpty(PD)) {
        PD = [];
    }

    // update the diseases of the patient
    Patient.findOneAndUpdate({
        hospitalNumber
    }, {
        "$set": {
            "diseases": PD,
        }
    }).catch((err) => {
        console.log(err);
    });

    // now update the score of the patient
    Promise.all([Patient.find({ hospitalNumber: hospitalNumber }), Disease.find({})])
        .then((data) => {
            var patient = data[0][0];
            var diseases = data[1];

            var scoreOfDisease = {};
            var score = 0;

            if (! _.isEmpty(diseases) && _.isArray(diseases)) {
                // create a hashmap with the diseases and their scores
                for (var i = 0; i < diseases.length; ++i) {
                    scoreOfDisease[diseases[i].name] = diseases[i].score;
                }

            	for (var i=0; i<patient.diseases.length; ++i) {
                   if (scoreOfDisease[patient.diseases[i]] > score) {
            			score = scoreOfDisease[patient.diseases[i]];
            		}
            	}
            }

            patient.score = score;
            patient.save();

            res.status(200).redirect('/app/patient/' + hospitalNumber);
        }).catch((err) => {
            cosole.log(err);
            res.status(400).redirect('/app/patient/' + hospitalNumber);
        });
});

/*
    POST /app/delete/:hospitalNumber -> detele a patient from the system
*/
router.get('/app/deletepatient/:hospitalNumber', (req, res) => {
    var hospitalNumber = req.params.hospitalNumber;

    Patient.find({
        hospitalNumber: hospitalNumber
    }).remove().then((patients) => {
        res.status(200).redirect('/app');
    }).catch((err) => {
        res.status(400).redirect('/app');
    });
});




module.exports = router;
