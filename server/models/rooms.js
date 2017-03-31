/*
    mongoDB Schema for rooms

    false = free room
    true  = occupied room
*/

const mongoose = require ('mongoose');

var RoomSchema = mongoose.Schema({
	name: {
        type: String,
        unique: true,
	   required: true,
	   default: 'No room name'
    },
    availability: {
        type: Boolean,
        required: true,
        default: false
    }
});

var Room = mongoose.model('Room', RoomSchema);

var rooms = {};
rooms["noroom"] = false;
rooms["T01"] = false;
rooms["T02"] = false;
rooms["T03"] = false;
rooms["T04"] = false;
rooms["T05"] = false;
rooms["T06"] = false;
rooms["T07"] = false;
rooms["T08"] = false;


/*
	Function to put the default diseases in the system
*/
function populateDatabase () {
    for (prop in rooms) {
        var room = Room({
            name: prop,
            availability: rooms[prop]
        });

		// simply save the default room in the system
        room.save().then((disease) => {
			// do nothing
		}, (err) => {
			// do nothing
		});
    }
}

populateDatabase();

module.exports = {rooms, Room};
