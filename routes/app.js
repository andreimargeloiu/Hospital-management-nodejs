// GET /app                  -> go the dashboard
// GET /app/addpatient       -> go to addPatient page
// GET /app/getrooms         -> return JSON with all rooms status in the system


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

/*
    GET /app/addpatient -> go to addPatient page
*/
router.get('/app/addpatient', (req, res) => {
    res.status(200).render('addPatient', {pageTitle: "Add patient"});
});

/*
    GET /app/getrooms -> return JSON with all rooms status in the system
*/
router.get('/app/getrooms', (req, res) => {
    Room.find({}, null, {sort: {name: 1}}).then((rooms) => {
        var roomsJSON = {};
        // rooms is an array with all rooms
        for (var i = 0; i < rooms.length; ++i) {
            console.log(rooms[i].name);
            roomsJSON[rooms[i].name] = rooms[i].availability;
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(roomsJSON));
    }).catch((err) => {
        console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send(JSON.stringify({noroom: false}));
    });
});

module.exports = router;
