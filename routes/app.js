// GET /app                  -> go the dashboard
// GET /app/addpatient       -> go to addPatient page
// GET /app/getrooms         -> return JSON with all rooms status in the system


const express = require('express');
const router = express.Router();

var {scoreOfDisease, Disease} = require('./../server/models/diseases.js');
var {Patient} = require('./../server/models/patient.js');
var rooms = require('./../server/models/rooms');

/*
    GET /app/ -> simply render the page
*/
router.get('/app', (req, res) => {
    res.render('dashboard');
});

/*
    GET /app/addpatient -> go to addPatient page
*/
router.get('/app/addpatient', (req, res) => {
    res.render('addPatient', {pageTitle: "Add patient"});
});

/*
    GET /app/getrooms -> return JSON with all rooms status in the system
*/
router.get('/app/getrooms', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(rooms));
});

module.exports = router;
