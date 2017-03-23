/*
    GET /app/updateroom/:hospitalNumber/:futureRoom -> put's patient hospitalNumber in the room roomName
*/
const express = require('express');
const _ = require('lodash');
const router = express.Router();

var {Patient} = require('./../server/models/patient.js');
var {rooms, Room} = require('./../server/models/rooms.js');
const {ObjectID} = require('mongodb');

/*
    GET /app/updateroom/hospitalNumber/roomName
*/
router.get('/app/updateroom/:hospitalNumber/:futureRoom', (req, res) => {
    var hospitalNumber = req.params.hospitalNumber;
    var futureRoom = req.params.futureRoom;

    // 1. Check if the currentRoom is empty
    // 2. unassign the current room of the patient
    // 3. assign him to the current room

    Promise.all([Room.find({}), Room.findOne({name: futureRoom}), Patient.findOne({hospitalNumber: hospitalNumber})])
        .then((data) => {
            var rooms = data[0];
            var futureRoomObject = data[1];
            var patient = data[2];

                // 1. Check if the currentRoom is empty
            if (rooms && patient && futureRoomObject && futureRoomObject["availability"] === false) {  // check that all the parameters were OK
                // 2. unassign the current room of the patient
                if (patient.room !== 'noroom') {
                    for (var i = 0; i < rooms.length; ++i) {
                        if (rooms[i].name === patient.room) {
                            rooms[i].availability = false;
                            rooms[i].save();
                            break;
                        }
                    }
                }

                // 3. assign him to the current room
                patient.room = futureRoomObject.name;
                patient.save();

                // 4. Set the futureRoom to be busy
                if (futureRoomObject.name !== 'noroom') {
                    // console.log("futureRoomObject.name", futureRoomObject.name);

                    for (var i = 0; i < rooms.length; ++i) {
                        if (rooms[i].name === futureRoomObject.name) {
                            rooms[i].availability = true;
                            rooms[i].save();
                            break;
                        }
                    }
                }
                res.status(200).redirect('/app');
            } else {
                throw Error("Bad request to change the room. Check the parameters.");
            }
        }).catch((err) => {
            console.log(err);
            res.status(400).render('dashboard');
        });
});


module.exports = router;
