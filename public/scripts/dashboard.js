var patientsWaitingTableConstructor = [];
var patientsInHospitalTableConstructor = [];
var freeRoomsTableConstructor = [];
var dynamicTableClickable = true;

$(document).ready(function() {
  var patientsAPI = "http://localhost:3000/app/getpatients";
  $.getJSON(patientsAPI).done(function(patients) {
	  var roomsAPI = "http://localhost:3000/app/getrooms";
	  $.getJSON(roomsAPI).done(function(rooms1) {
	  	  for(var room in rooms1["rooms"]) {
		  	  var freeRoomsRowConstructor = [];
		  	  var iterator = 0;

		  	  for(var i = 0; i < patients.length; i++) {
		  	  	  if(room !== patients[i]["room"]) {
		  	  	  	  iterator++;
		  	  	  }
		  	  }
		  	  if(iterator === patients.length) {
		  	  	  freeRoomsRowConstructor.push(room);
		  	  	  freeRoomsTableConstructor.push(freeRoomsRowConstructor);
		  	  }
		  }

		  console.log(freeRoomsRowConstructor);
		  console.log(freeRoomsTableConstructor);

		  for(var i = 0; i < patients.length; i++) {
			  var patient = patients[i];

			  var patientsRowConstructor = [];
			  patientsRowConstructor.push(patient["hospitalNumber"]);
			  patientsRowConstructor.push(patient["firstName"] + " " + patient["lastName"]);

			  if(patient["room"] === "no room") {
			  	  patientsRowConstructor.push(patient["score"]);

			  	  patientsWaitingTableConstructor.push(patientsRowConstructor);
			  } else {
			  	  patientsRowConstructor.push(patient["room"]);
			  	  patientsRowConstructor.push(patient["score"]);

			  	  patientsInHospitalTableConstructor.push(patientsRowConstructor);
			  }
		  }

		  $('#patients-waiting').dataTable({
		       data: patientsWaitingTableConstructor,
		       columns: [{
		       	   title: "Hospital no."
		       }, {
		           title: "Name"
		       }, {
		           title: "Score"
		       }],
		       scrollY: '60vh',
		       scrollCollapse: true,
		       paging: false,
		       resposnive: true,
		       info: false
		   });

		  $('#patients-in-hospital').DataTable({
   				data: patientsInHospitalTableConstructor,
		        columns:[{
	                title: "Hospital no."
	            },{
	           	    title: "Name"
	            },{
	           	    title: "Room"
	            },{
	           	    title: "Score"
	            }],
		        scrollY: '60vh',
		        scrollCollapse: true,
		        paging: false,
		        resposnive: true,
		        info: false
            });

			//  table with free rooms in the right side
		  $('#free-rooms').dataTable({
			  data: freeRoomsTableConstructor,
			  columns:[{
				  title: "Free rooms"
			  }],
			  scrollY: '60vh',
			  scrollCollapse: true,
			  paging: false,
			  resposnive: true,
			  info: false
		  });


            //   Set dashboard data in the three boxes on the top
            var patientsWithRoomsDashboard = patientsInHospitalTableConstructor.length || 0;
            $("#patients-with-rooms-live").html(patientsWithRoomsDashboard);

            var patientsWaitingDashboard = patientsWaitingTableConstructor.length || 0;
            $("#patients-waiting-live").html(patientsWaitingDashboard);

            var freeRoomsDashboard = freeRoomsTableConstructor.length || 0;
            $("#free-rooms-live").html(freeRoomsDashboard);

	  });
  });
});



$("body").on('click', '#patients-in-hospital > tbody > tr', function()
{
    if(dynamicTableClickable)
    {
      var NHSnumber = $(this).children('td')[0];
      NHSnumber = NHSnumber.textContent;
      window.location.href = "http://localhost:3000/app/patient/" + NHSnumber;
    }
});
$("body").on('click', '#patients-waiting > tbody > tr', function()
{
	var NHSnumber = $(this).children('td')[0];
	NHSnumber = NHSnumber.textContent;
	window.location.href = "http://localhost:3000/app/patient/" + NHSnumber;
});
