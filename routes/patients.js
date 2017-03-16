// POST /app/addpatient           -> add a patient in the database
// GET  /app/getpatients          -> get a JSON with all patients
// GET  /app/patient/:NHSnumber   -> get one patiente data
// GET  /app/getpatient/:NHSnumber-> get JSON of a patiente data
// PUT  /app/patient/:NHSnumber   -> update a patient data from the database

const express = require('express');
const router = express.Router();

var scoreOfDisease = require('./../server/models/diseases.js');
var {Patient, computeScore} = require('./../server/models/patient.js');
var {rooms, assignRoom, unassignRoom} = require('./../server/models/rooms.js');
const {ObjectID} = require('mongodb');

/*
    POST /addPatient -> add new patient
*/
router.post('/app/addpatient', (req, res) => {
    // receive the form data in the array PD, each element being a String with the disease name
    var PD = req.body.PD;
    if (PD === null || PD === undefined) {
        PD = [];
    }

    // make a new patient and add it in the database
    var patient = Patient({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        NHSnumber: req.body.NHSnumber || "12345678",
        diseases: PD,
        score: computeScore(PD)
    });

    patient.save(function(err, patient) {
        if (err) {
            console.log(err);
        }
    });

    res.redirect('/app');
});

router.get('/app/getpatients', (req, res) => {
    Patient.find({}, function (err, patients) {
        if (err) {
            console.log(err);
            res.status(404).send();
        }
        res.send(patients);
    });
});

/*
    GET one patient data -> for his personal page
*/
router.get('/app/patient/:NHSnumber', (req, res) => {
    NHSnumber = req.params.NHSnumber;
    Patient.findOne({
        NHSnumber: NHSnumber
    }, function (err, patient) {
        if (err) {
            console.log(err);
            res.status(404).send();
        }
        res.render('patientPage');
    });
});

/*
    GET one patient data and return it as JSON
*/
router.get('/app/getpatient/:NHSnumber', (req, res) => {
    NHSnumber = req.params.NHSnumber;
    Patient.findOne({
        NHSnumber: NHSnumber
    }, function (err, patient) {
        if (err) {
            console.log(err);
            res.status(404).send();
        }
        res.send(patient);
    });
});

/*
    PUT /app/getpatient -> update a patient data
*/
var actualRoom;
function retrieveRoom(NHSnumber, callback) {
    Patient.find({
        NHSnumber: NHSnumber
    }, function (err, patient) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, patient.room);
        }
    });
}

router.post('/app/updatepatient/:NHSnumber', (req, res) => {
    NHSnumber = req.params.NHSnumber;

    // unassign the past room of the patient
    // retrieveRoom(NHSnumber, (err, room) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         actualRoom = room;
    //     }
    // });
    // unassignRoom(actualRoom);

    // assign the new room to the patient
    // var newRoom = req.body.room;
    // assignRoom(newRoom);

    // GET form attributes
    var PD = req.body.PD;
    if (PD === null || PD === undefined) {
        PD = [];
    }
    var newScore = computeScore(PD); // Compute new score

    // update the patient details
    Patient.findOneAndUpdate({
        NHSnumber: NHSnumber
    }, {
        "$set": {
            "diseases": PD,
            "score": newScore
        }
    }, (err, patient) => {
        if (err) {
            console.log(err);
            res.status(404).send();
        }
    });
    res.redirect('/app/patient/' + NHSnumber);
});

module.exports = router;
