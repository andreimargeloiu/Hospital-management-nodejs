// POST app/addpatient       -> add a patient in the database
// GET app/getpatients       -> get a JSON with all patients
// GET app/getpatient/:id    -> get one patience data

const express = require('express');
const router = express.Router();

var scoreOfDisease = require('./../server/models/diseases.js');
var {Patient} = require('./../server/models/patient.js');
const {ObjectID} = require('mongodb');

router.get('/glebpatients', (req, res) => {
    res.render('patients');
});

/*
    POST /addPatient -> adds new patient
*/
router.post('/app/addpatient', (req, res) => {
    // receive the form data in the array PD, each element being a String with the disease name
    var PD = req.body.PD; // PD = patient diseases

    // make a new patient and add it in the database
    var patient = Patient({
        diseases: PD
    });

    patient.computeScore();
    patient.save(function(err, patient) {
        if (err) {
            res.status(400).send();
        }
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

/*
    GET one patient data -> for his personal page
*/
router.get('/app/getpatient/:id', (req, res) => {
    ID = console.log(req.params.id);
    Patient.findOne(ID).then((patient) => {
        res.send(patient);
    }, (err) => {
        res.status(404).send();
    });
});

module.exports = router;
