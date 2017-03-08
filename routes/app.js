// GET /app -> go the the dashboard
// GET /app/getdiseases -> return JSON with all diseases in the system

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



router.get('/app/getdiseases', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(scoreOfDisease));
});


module.exports = router;
