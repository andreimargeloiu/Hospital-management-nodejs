/*
    Rooms of the hospital are kept in an object, for fast access
        -> an object is implemented like a hashmap in javscript, you can acces object["property"] in O(1) complexity

    false = free room
    true  = occupied room
*/
var rooms = {};
rooms["T01"] = false;
rooms["T02"] = false;
rooms["T03"] = false;
rooms["T04"] = false;
rooms["T05"] = false;
rooms["T06"] = false;
rooms["T07"] = false;
rooms["T08"] = false;

/*
	Assign a room
*/
function assignRoom(roomNumber) { // roomNumber must be a String
	if (roomNumber === 'no room') {
        //nothing happens
    } else { // a rooms is assigned
        rooms[roomNumber] = true;
    }
}

/*
	Unassign a room
*/
function unassignRoom(roomNumber) {
    if (roomNumber === 'no room') {
        // nothing happens
    } else { // a room is unassigned
        rooms[roomNumber] = false;
    }
}

module.exports = {rooms, assignRoom, unassignRoom};
