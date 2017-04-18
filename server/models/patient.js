const mongoose = require('mongoose');
const _ = require('lodash');
var {scoreOfDisease, Disease} = require('./diseases.js');
var rooms = require('./rooms.js');

// User Schema
var PatientSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
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
		unique: true
	},
	diseases: {
        type: Array,
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
	lastUpdate: {
		type: Number,
		required: true
	}
});

/*
	function to update the diseases and the score of a patient
	*Requires the patient to have the diseases already saved in the databases
*/
PatientSchema.methods.updateScore = function () {
	var patient = this;

	// promise to get the patient object inside the diseases callback
	var promise = new Promise(function(resolve, reject) {
		resolve(patient);
		reject(patient);
	})

	Promise.all([promise.then(function (patient) { return patient; }), Disease.find({})])
         .then((data) => {
             var patient = data[0];
             var diseases = data[1];

             var scoreOfDisease = {};
             var score = 0;

		   if (! _.isEmpty(diseases) && _.isArray(diseases)) {
                 // create a hashmap with the diseases and their scores
                 for (var i = 0; i < diseases.length; ++i) {
                     scoreOfDisease[diseases[i].name] = diseases[i].score;
                 }

            	  for (var i = 0; i < patient.diseases.length; ++i) {
	                if (scoreOfDisease[patient.diseases[i]] > score) {
	        			score = scoreOfDisease[patient.diseases[i]];
	        	 	 }
             	 }
             }

             patient.score = score;
             patient.save().catch((err) => {
			   console.log(err);
		   });
         }).catch((err) => {
             console.log(err);
	 });
}

var Patient = mongoose.model('Patient', PatientSchema);
module.exports = {Patient};
