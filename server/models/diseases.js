
var scoreOfDisease = {}; // empty map

scoreOfDisease["Adenovirus"] = 20;
scoreOfDisease['Campylobacter'] = 10;
scoreOfDisease['CJD'] = 10;
scoreOfDisease['Cryptococcus'] = 5;

// console.log(JSON.stringify(diseases, undefined, 2));
//
// console.log(diseases['Cryptococcus']);
//
// for (var property in diseases) {
//     if (diseases.hasOwnProperty(property)) {
//         console.log(property + " " + diseases[property]);
//         console.log('\n');
//     }
// }

module.exports = scoreOfDisease;
