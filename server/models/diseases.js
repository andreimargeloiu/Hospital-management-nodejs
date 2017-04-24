/*
	mongoDB Schema for diseases
*/
const mongoose = require ('mongoose');

var DiseaseSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
	   required: true 
    },
    score: {
        type: Number,
        required: true,
        default: 0
    }
});

var Disease = mongoose.model('Disease', DiseaseSchema);

/*
 	Default diseases in the system
		-> those will be added as soon as the system is live
		-> if they are deleted from the system, and the system restarts, then they will be added again in the system
*/

var scoreOfDisease = {}; // empty map

module.exports = {scoreOfDisease, Disease};
