// GET /app -> go the the dashboard
// GET /app/settings -> go the the settings
// GET /app/getdiseases -> return JSON with all diseases in the system

const express = require('express');
const router = express.Router();

var scoreOfDisease = require('./../server/models/diseases.js');
var {Patient} = require('./../server/models/patient.js');

/*
    GET /app/ -> simply render the page
*/
router.get('/app', (req, res) => {
    res.render('dashboard', {pageTitle: "Dashboard"});
});

router.get('/app/settings', (req, res) => {
    res.render('settings', {pageTitle: "Settings"});
});

router.get('/app/addpatient', (req, res) => {
    res.render('addpatient', {pageTitle: "Add patient"});
});

router.get('/app/newaddpatient', (req, res) => {
    res.render('newaddpatient', {pageTitle: "New add patient"});
});


router.get('/app/getdiseases', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(scoreOfDisease));
});


module.exports = router;
