const mongoose = require ('mongoose');
var {scoreOfDisease, Disease} = require('./diseases.js');
var rooms = require('./rooms.js');

// User Schema
var PatientSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		default: "No first name"
	},
	lastName: {
		type: String,
		required: true,
		default: "No last name"
	},
	dateOfBirth: {
		type: String,
		required: true,
	},
	sex: {
		// true = male
		// false = female
		type: Boolean,
		required: true,
		default: true
	},
	hospitalNumber: {
		type: String,
		required: true,
		unique: true,
		default: '134574806'
	},
	diseases: {
        type: Array,
		required: true,
        default: []
    },
    score: {
        type: Number,
		required: true,
        default: 0
    },
	room: {
		type: String,
		required: true,
		default: 'noroom'
	},
	dateUpdated: {
		type: Date,
		required: true,
		default: Date(2017, 3, 17, 19, 21)
	}
});

var Patient = mongoose.model('Patient', PatientSchema);
module.exports = {Patient};
