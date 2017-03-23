$(document).ready(function() {
    var hospitalNumber= window.location.pathname.split('/');

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // Change the index of the array NHSnumbr when giving into production
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    var patientAPI = "http://localhost:3000/app/getpatient/" + hospitalNumber[3];

    $("#form-patient").attr("action", "/app/updatepatient/" + hospitalNumber[3]);
    $("#delete-button").attr("href", "/app/deletepatient/" + hospitalNumber[3]);

    $.getJSON(patientAPI).done(function(patient) {
       $("#first-name-disabled").attr("placeholder", patient["firstName"]);
       $("#last-name-disabled").attr("placeholder", patient["lastName"]);
       $("#hospitalNumber-disabled").attr("placeholder", patient["hospitalNumber"]);
       $("#patient-score").html(patient["score"]);
/*
       Sex of the patient
*/
       if (patient["sex"] === true) {
           $("#patient-sex-disabled").attr("placeholder", "Male");
       } else if (patient["sex"] === false) {
           $("#patient-sex-disabled").attr("placeholder", "Female");
       }

/*
      Room of the patient
*/
       if (patient["room"] === "no room") {
           $("#patient-room").text('No room');
       } else {
           $("#patient-room").text('Room: ' + patient["room"]);
       }

/*
       Score panel
*/
       if (patient["score"] <=5) {
           $("#panel-score").attr("class", "panel panel-primary");
       } else if (patient["score"] <= 20) {
           $("#panel-score").attr("class", "panel panel-yellow");
       } else if (patient["score"] <= 35) {
           $("#panel-score").attr("class", "panel panel-orange");
       } else {
           $("#panel-score").attr("class", "panel panel-red");
       }

       var diseasesAPI = "http://localhost:3000/app/getdiseases";
       $.getJSON(diseasesAPI).done(function(allDiseases) {
           var diseasesScoresCheckboxes = [];

           for(var disease in allDiseases) {
               var diseaseScoreCheckbox = [];
        	   diseaseScoreCheckbox[0] = disease;
        	   diseaseScoreCheckbox[1] = allDiseases[disease]; // This is the score.

        	   var input;
               if (patient["diseases"].length !== 0) {
                   for(var i = 0; i < patient["diseases"].length; i++) {
            	   	   if(disease === patient["diseases"][i]) {
            	   	   	   input = "<input type=\"checkbox\" name=\"PD[]\" value=\"" + disease + "\" checked>";
            	   	   	   break;
            	   	   } else {
            	   	       input = "<input type=\"checkbox\" name=\"PD[]\" value=\"" + disease + "\">";
            	   	   }
            	   }
               } else {
                   input = "<input type=\"checkbox\" name=\"PD[]\" value=\"" + disease + "\">";
               }

          	   diseaseScoreCheckbox[2] = input;
        	   diseasesScoresCheckboxes.push(diseaseScoreCheckbox)
           }

           // Add name, sex, number, age before the table.
           $('#diagnosis').dataTable({
		      data: diseasesScoresCheckboxes,
		      columns:[{
	              title: "Disease"
	          },{
	              title: "Score"
	          },{
	              title: "Diagnosis"
	          }],
		      scrollY: '60vh',
		      scrollCollapse: true,
		      paging: false,
              info: false,
              language: {
                sSearch: "Search disease"
              }
		   });
       });
    });
});
