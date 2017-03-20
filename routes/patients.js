// POST /app/addpatient           -> add a patient in the database
// GET  /app/getpatients          -> get a JSON with all patients
// GET  /app/patient/:hospitalNumber   -> get one patiente data
// GET  /app/getpatient/:hospitalNumber-> get JSON of a patiente data
// PUT  /app/patient/:hospitalNumber   -> update a patient data from the database

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
    // receive the diseases from the form in the array PD, each element being a String with the disease name
    var PD = req.body.PD;
    if (PD === null || PD === undefined) {    // check if no disease is selected
        PD = [];
    }

    var sex = req.body.sex;
    if (sex === "male") {
        sex = true;
    } else if (sex === "female") {
        sex = false;
    }

    console.log(sex);

    // make a new patient and add it in the database
    var patient = Patient({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        sex: sex,
        hospitalNumber: req.body.hospitalNumber || "12345678",
        diseases: PD,
        score: computeScore(PD)
    });

    patient.save();

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
router.get('/app/patient/:hospitalNumber', (req, res) => {
    hospitalNumber = req.params.hospitalNumber;
    Patient.findOne({
        hospitalNumber: hospitalNumber
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
router.get('/app/getpatient/:hospitalNumber', (req, res) => {
    hospitalNumber = req.params.hospitalNumber;
    Patient.findOne({
        hospitalNumber: hospitalNumber
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
function retrieveRoom(hospitalNumber, callback) {
    Patient.find({
        hospitalNumber: hospitalNumber
    }, function (err, patient) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, patient.room);
        }
    });
}

router.post('/app/updatepatient/:hospitalNumber', (req, res) => {
    hospitalNumber = req.params.hospitalNumber;

    // unassign the past room of the patient
    // retrieveRoom(hospitalNumber, (err, room) => {
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
        hospitalNumber: hospitalNumber
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
    res.redirect('/app/patient/' + hospitalNumber);
});

router.get('/app/deletepatient/:hospitalNumber', (req, res) => {
    var hospitalNumber = req.params.hospitalNumber;

    Patient.find({
        hospitalNumber: hospitalNumber
    }).remove().exec(function(err, data) {
        if (err) {
            console.log(err);
            res.status(404).send();
        }
    });
    res.redirect('/app');
});

module.exports = router;
