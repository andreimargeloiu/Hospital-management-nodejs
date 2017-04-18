// GET /app                  -> go the dashboard
// GET /app/addpatient       -> go to addPatient page

const express = require('express');
const router = express.Router();

var {scoreOfDisease, Disease} = require('./../server/models/diseases.js');
var {Patient} = require('./../server/models/patient.js');
var {rooms, Room} = require('./../server/models/rooms');

/*
    GET /app/ -> simply render the page
*/
router.get('/app', (req, res) => {
    res.status(200).render('dashboard');
});

module.exports = router;
