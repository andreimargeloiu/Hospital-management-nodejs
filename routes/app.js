const express = require('express');
const router = express.Router();

var scoreOfDisease = require('./../server/models/diseases.js');
var {Patient} = require('./../server/models/patient.js');

/*
    GET /app/ -> simply render the page
*/
router.get('/app', (req, res) => {
    res.render('dashboard');
});

/*
    POST /addPatient -> adds new patient
*/
router.post('/app/addpatient', (req, res) => {
    // receive the form data in the array PD, each element being a String with the disease name
    var PD = req.body.PD; // PD = patient diseases
    console.log(req.body.PD);

    // make a new patietn and add it in the database
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


module.exports = router;
