const mongoose = require ('mongoose');
var scoreOfDisease = require('./diseases.js');
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
		default: 'no room'
	},
	updated: {
		type: Date,
		default: Date(2017, 3, 17, 19, 21)
	}
});

/*
	Compute the score of a patient
*/
function computeScore(arrayDiseases) {
    var score = 0;
	if (arrayDiseases !== null && arrayDiseases !== undefined) {
		if (arrayDiseases instanceof Array) {
			for (var i = 0; i<arrayDiseases.length; ++i) {
				if (scoreOfDisease[arrayDiseases[i]] > score) {
					score = scoreOfDisease[arrayDiseases[i]];
				}
			}
		}
	}

    return score;
}

var Patient = mongoose.model('Patient', PatientSchema);
module.exports = {Patient, computeScore};
