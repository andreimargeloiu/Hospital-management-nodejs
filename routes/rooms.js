/*
    GET /app/updateroom/:hospitalNumber/:futureRoom  -> put's patient hospitalNumber in the room roomName
    GET /app/getrooms                                -> return JSON with all rooms status in the system
    POST /app/addroom                                -> add a new room in the system
    POST /app/deleteromm                             -> delete a disease from the system
*/
const express = require('express');
const _ = require('lodash');
const router = express.Router();

var {Patient} = require('./../server/models/patient.js');
var {rooms, Room} = require('./../server/models/rooms.js');
const {ObjectID} = require('mongodb');


/*
    GET /app/getrooms -> return JSON with all rooms status in the system
*/
router.get('/app/getrooms', (req, res) => {
    Room.find({}, null, {sort: {name: 1}}).then((rooms) => {
        var roomsJSON = {};
        // rooms is an array with all rooms
        for (var i = 0; i < rooms.length; ++i) {
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

/*
    GET /app/updateroom/hospitalNumber/roomName
*/
router.post('/app/updateroom/', (req, res) => {
    var hospitalNumber = req.body.hospitalNumber;
    var futureRoom = req.body.futureRoom;
    var redirect = req.body.redirect;

    var promise = new Promise(function(resolve, reject) {
         console.log("redirect from promise");
         resolve(redirect);
     });

    // 1. Check if the currentRoom is empty
    // 2. unassign the current room of the patient
    // 3. assign him to the current room

    Promise.all([Room.find({}), Room.findOne({name: futureRoom}), Patient.findOne({hospitalNumber: hospitalNumber}), promise.then(function(redirect) { return redirect; })])
        .then((data) => {
            var rooms = data[0];
            var futureRoomObject = data[1];
            var patient = data[2];
            var redirect = data[3];


                // 1. Check if the currentRoom is empty
            if (rooms && patient && futureRoomObject && futureRoomObject["availability"] === false && (redirect === 'yes' || redirect === 'no')) {  // check that all the parameters were OK
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
                if (redirect === 'yes') res.status(200).redirect('/app');
            } else {
                throw Error("Bad request to change the room. Check the parameters.");
            }
        }).catch((err) => {
            console.log(err);
            res.redirect('/app');
        });
});


/*
    POST /app/addroom -> add a new room in the system
*/
router.post('/app/addroom', (req, res) => {
    var roomName = req.body.roomName;

    // check that the name is a String
    if (_.isString(roomName) && !_.isNaN(roomName)) {
        var room = Room({
            name: roomName,
            availability: false
        });

        room.save().then((room) => {
            console.log('Room added');
            res.status(200).redirect('/app/systemsettings');
        }).catch((err) => {
            console.log(err);
            res.status(400).redirect('/app/systemsettings');
        });
    } else {
        res.status(400).redirect('/app/systemsettings', {messages: req.flash('success_msg', 'Room added succesfully.') });
    }
});

/*
    POST /app/deleteroom -> delete a room from the system
*/
router.post('/app/deleterooms', (req, res) => {
    var roomsToDelete = req.body.RD;

    if (_.isArray(roomsToDelete)) {
        for (var i = 0; i < roomsToDelete.length; ++i) {
            Room.find({
                name: roomsToDelete[i]
            }).remove().catch((err) => {
                console.log(err);
            });
        }
        res.status(200).redirect('/app/systemsettings');
    } else {
        res.status(400).redirect('/app/systemsettings');
    }
});


module.exports = router;
