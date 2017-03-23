const mongoose = require ('mongoose');
var {scoreOfDisease, Disease} = require('./diseases.js');
var rooms = require('./rooms.js');

// User Schema
var PatientSchema = mongoose.Schema({
	firstName: {
		type: String,
		default: "No first name"
	},
	lastName: {
		type: String,
		default: "No last name"
	},
	dateOfBirth: {
		type: Date,
		default: Date(2017, 3, 17, 19, 21)
	},
	sex: {
		// true = male
		// false = female
		type: Boolean,
		default: true
	},
	hospitalNumber: {
		type: String,
		unique: true,
		default: '134574806'
	},
	diseases: {
        type: Array,
        default: []
    },
    score: {
        type: Number,
        default: 0
    },
	room: {
		type: String,
		default: 'noroom'
	},
	updated: {
		type: Date,
		default: Date(2017, 3, 17, 19, 21)
	}
});

var Patient = mongoose.model('Patient', PatientSchema);
module.exports = {Patient};
