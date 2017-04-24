/*
     GET /app/addpatient -> go to addPatient page
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
var {rooms, Room} = require('./../server/models/rooms.js');
var isValidDate = require('is-valid-date');
const {ObjectID} = require('mongodb');


/*
    GET /app/addpatient -> go to addPatient page
*/
router.get('/app/addpatient', (req, res) => {
    res.render('addpatient', {pageTitle: "Add patient"});
});

/*
    POST /addPatient -> add new patient
*/
router.post('/app/addpatient', (req, res) => {
    // receive the diseases from the form in the array PD, each element being a String with the disease name
    var PD = req.body.PD;
    var dateOfBirth = req.body.dateOfBirth;

    // console.log(dateOfBirth);
    // console.log(isValidDate(dateOfBirth));

    if (_.isEmpty(PD)) {    // check if no disease is selected
        PD = [];
    }

    // Check for empty fields
    if (_.isEmpty(req.body.firstName) || _.isEmpty(req.body.lastName) || _.isEmpty(req.body.hospitalNumber) || !isValidDate(dateOfBirth)) {
        if (_.isEmpty(req.body.firstName)) req.flash('error_msg', 'Please enter the first name.');
        if (_.isEmpty(req.body.lastName)) req.flash('error_msg', 'Please enter the last name.');
        if (_.isEmpty(req.body.hospitalNumber)) req.flash('error_msg', 'Please enter the hospital number.');
        if (!isValidDate(dateOfBirth)) req.flash('error_msg', 'The date is not valid.');

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
            firstName: _.capitalize(req.body.firstName),
            lastName: _.capitalize(req.body.lastName),
            sex: sex,
            dateOfBirth: dateOfBirth,
            hospitalNumber: _.toUpper(req.body.hospitalNumber),
            diseases: PD,
            lastUpdate: (new Date().getTime())
        });

        patient.save().then((patient) => {
            patient.updateScore();
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

    Patient.findOneAndUpdate({
        hospitalNumber
    }, {
        "$set": {
            "diseases": PD,
            "lastUpdate": (new Date().getTime())
         }
    },{
        new: true
    }).then((patient) => {
        patient.updateScore();
        res.redirect('/app/patient/' + hospitalNumber);
    }).catch((err) => {
        console.log(err);
        res.redirect('/app/patient/' + hospitalNumber);
    });
});

/*
    POST /app/delete/:hospitalNumber -> detele a patient from the system
*/
router.get('/app/deletepatient/:hospitalNumber', (req, res) => {
    var hospitalNumber = req.params.hospitalNumber;

    Promise.all([Room.find({}), Patient.findOne({hospitalNumber: hospitalNumber})])
        .then((data) => {
            var rooms = data[0];
            var patient = data[1];

            // if the patient is in a room, make the room empty
            if (patient.room !== 'noroom') {
                 for (var i = 0; i < rooms.length; ++i) {
                    if (rooms[i].name === patient.room) {
                         rooms[i].availability = false;
                         rooms[i].save();
                         break;
                    }
                 }
            }

            patient.remove().then((patients) => {
               res.status(200).redirect('/app');
            });
         }).catch((err) => {
            res.status(400).redirect('/app');
         });
});

module.exports = router;
