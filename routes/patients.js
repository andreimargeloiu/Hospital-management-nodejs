const express = require('express');
const router = express.Router();

var scoreOfDisease = require('./../server/models/diseases.js');
var {Patient} = require('./../server/models/patient.js');
const {ObjectID} = require('mongodb');
/*
    POST /addPatient -> adds new patient
*/
router.post('/app/addpatient', (req, res) => {
    // receive the form data in the array PD, each element being a String with the disease name
    var PD = req.body.PD; // PD = patient diseases
    console.log(req.body.PD);

    // make a new patient and add it in the database
    var patient = Patient({
        diseases: PD
    });
    patient.computeScore();
    console.log(JSON.stringify(patient, undefined, 2));
    patient.save(function(err, patient) {
        if (err) {
            return;
        }
        console.log(patient);
    });

    res.render('dashboard', {
        score: patient.score
    });
});

router.get('/app/getpatients', (req, res) => {
    Patient.find({}).then((patients) => {
        res.send(patients);
    }, (err) => {
        res.status(404).send();
    });
});

router.get('/app/getpatient/:id', (req, res) => {
    ID = console.log(req.params.id);
    Patient.findOne(ID).then((patient) => {
        res.send(patient);
    }, (err) => {
        res.status(404).send();
    });
});

module.exports = router;
