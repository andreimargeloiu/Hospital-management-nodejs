
var scoreOfDisease = {}; // empty map

scoreOfDisease["Adenovirus"] = 20;
scoreOfDisease['Anthrax'] = 50;
scoreOfDisease['BK virus'] = 40;
scoreOfDisease['Campylobacter'] = 10;
scoreOfDisease['Chicken Pox'] = 70;
scoreOfDisease['CJD'] = 10;
scoreOfDisease['Cryptococcus'] = 5;
scoreOfDisease['Test disease'] = 30;




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
