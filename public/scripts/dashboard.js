$(document).ready(function () {

      var flickerAPI = "http://localhost:3000/app/getpatients";
      $.getJSON(flickerAPI).done(function(patients) {

      	// console.log(patients[0]);

      	var patientsArray = [];

      	for (var i = 0; i < patients.length; ++i) {
      		var patient = patients[i];

      		var patientArray = [];
      		patientArray.push(patient["NHSnumber"]);
      		patientArray.push(patient["firstName"] + " " + patient["lastName"]);
      		patientArray.push(patient["room"]);
      		patientArray.push(patient["score"]);

      		patientsArray.push(patientArray);
      	}

      	$('#patients-waiting').dataTable( {
	        data: patientsArray,
	        columns: [
	            { title: "NHSnumber" },
	            { title: "Name" },
	            { title: "Room" },
	            { title: "Score" }
	        ],
	        scrollY:        '60vh',
	        scrollCollapse: true,
	        paging:         false,
            resposnive:     true,
            info: false
   		} );


   		$('#patients-waiting2').dataTable( {
	        data: patientsArray,
	        columns: [
	            { title: "NHSnumber" },
	            { title: "Name" },
	            { title: "Room" },
	            { title: "Score" }
	        ],
	        scrollY:        '60vh',
	        scrollCollapse: true,
	        paging:         false,
            resposnive:     true,
            info: false
   		} );
	} );
} );
