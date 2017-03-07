const mongoose = require ('mongoose');
var scoreOfDisease = require('./diseases.js');

// User Schema
var PatientSchema = mongoose.Schema({
	name: {
		type: String,
		default: "Annette Jeanes",
		required: true
	},
	diseases: {
        type: Array,
        default: []
    },
    score: {
        type: Number,
        default: 0
    }
});

PatientSchema.methods.computeScore = function () {
    var patient = this;
    var score = 0;
    for (var i = 0; i<patient.diseases.length; ++i) {
        if (scoreOfDisease.hasOwnProperty(patient.diseases[i]))
            if (scoreOfDisease[patient.diseases[i]] > score) {
                score = scoreOfDisease[patient.diseases[i]];
            }
        }
    patient.score = score;
}



var Patient = mongoose.model('Patient', PatientSchema);

module.exports = {Patient};
