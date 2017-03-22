/*
	mongoDB Schema for diseases
*/
const mongoose = require ('mongoose');

var DiseaseSchema = mongoose.Schema({
	name: {
        type: String,
        unique: true,
		required: true,
		default: 'No disease name'
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
scoreOfDisease['Adenovirus'] = 20;
scoreOfDisease['Anthrax'] = 50;
scoreOfDisease['BK virus'] = 40;
scoreOfDisease['Campylobacter'] = 10;
scoreOfDisease['Chicken Pox'] = 70;
scoreOfDisease['CJD'] = 10;
scoreOfDisease['Cryptococcus'] = 5;

/*
	Function to put the default diseases in the system
*/
function populateDatabase () {
    for (prop in scoreOfDisease) {
        var disease = Disease({
            name: prop,
            score: scoreOfDisease[prop]
        });

		// simply save the default diseases in the system
        disease.save().then((disease) => {
			// do nothing
		}, (err) => {
			// do nothing
		});
    }
}

populateDatabase();

module.exports = {scoreOfDisease, Disease};
