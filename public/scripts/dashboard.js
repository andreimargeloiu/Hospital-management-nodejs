var patientsWaitingTableConstructor = [];
var patientsInHospitalTableConstructor = [];
var freeRoomsTableConstructor = [];
var dynamicTableClickable = true;

$(document).ready(function() {
  var patientsAPI = "http://localhost:3000/app/getpatients";
  $.getJSON(patientsAPI).done(function(patients) {
	  var roomsAPI = "http://localhost:3000/app/getrooms";
	  $.getJSON(roomsAPI).done(function(rooms1) {

          // iterate through all rooms
	  	  for(var room in rooms1) {
		  	  var freeRoomsRowConstructor = [];

              if (room === 'noroom') {
                  freeRoomsRowConstructor.push("Waiting list");
		  	  	  freeRoomsTableConstructor.push(freeRoomsRowConstructor);
              } else if(rooms1[room] === false) {
		  	  	  freeRoomsRowConstructor.push(room);
		  	  	  freeRoomsTableConstructor.push(freeRoomsRowConstructor);
		  	  }
		  }

		  for(var i = 0; i < patients.length; i++) {
			  var patient = patients[i];

			  var patientsRowConstructor = [];
			  patientsRowConstructor.push(patient["hospitalNumber"]);
			  patientsRowConstructor.push(patient["firstName"] + " " + patient["lastName"]);

			  if(patient["room"] === "noroom") {
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
		       	   title: "Hospital no.",
                   width: "40%"
		       }, {
		           title: "Name",
                   width: "50%"
		       }, {
		           title: "Score",
                   width: "10%"
		       }],
		       scrollY: '60vh',
		       scrollCollapse: true,
		       paging: false,
		       resposnive: true,
		       info: false,
               language: {
                 searchPlaceholder: "Search patient waiting...",
                 sSearch: ""
               },
               aaSorting: [[2, 'desc']],
               fnCreatedRow: function(nRow, aData, iDisplayIndex) {
                    // nRow - this is the HTML element of the row
                    // aData - array of the data in the columns. Get column 4 data: aData[3]
                    // iDataIndex - row index in the table

                   // color the Score field
                   if (aData[2] >= 35) { // red
                       $('td:eq(2)', nRow).css("background-color", "#ffad99");
                   } else if (aData[2] >=20) { // orange
                       $('td:eq(2)', nRow).css("background-color", "#ffdd99");
                   } else if (aData[2] >= 10) { // yellow
                       $('td:eq(2)', nRow).css("background-color", "#ffffcc");
                   }
               }
		   });

		  $('#patients-in-hospital').DataTable({
   				data: patientsInHospitalTableConstructor,
		        columns:[{
	                title: "Hospital no.",
                     width: "30%"
	            },{
	           	    title: "Name",
                     width: "40%"
	            },{
	           	    title: "Room",
                     width: "15%"
	            },{
	           	    title: "Score",
                     width: "15%"
	            }],
		        scrollY: '60vh',
		        scrollCollapse: true,
		        paging: false,
		        resposnive: true,
		        info: false,
                language: {
                  searchPlaceholder: "Search patient in room...",
                  sSearch: ""
                },
                aaSorting: [[3, 'desc']],
                fnCreatedRow: function(nRow, aData, iDisplayIndex) {
                     // nRow - this is the HTML element of the row
                     // aData - array of the data in the columns. Get column 4 data: aData[3]
                     // iDataIndex - row index in the table

                    // color the Score field
                    if (aData[3] >= 35) { // red
                        $('td:eq(3)', nRow).css("background-color", "#ffad99");
                    } else if (aData[3] >=20) { // orange
                        $('td:eq(3)', nRow).css("background-color", "#ffdd99");
                    } else if (aData[3] >= 10) { // yellow
                        $('td:eq(3)', nRow).css("background-color", "#ffffcc");
                    }
                }
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
			  info: false,
              language: {
                searchPlaceholder: "Search room...",
                sSearch: ""
              }
		  });

            //   Set dashboard data in the three boxes on the top
            var patientsWithRoomsDashboard = patientsInHospitalTableConstructor.length || 0;
            $("#patients-with-rooms-live").html(patientsWithRoomsDashboard);

            var patientsWaitingDashboard = patientsWaitingTableConstructor.length || 0;
            $("#patients-waiting-live").html(patientsWaitingDashboard);

            var freeRoomsDashboard = freeRoomsTableConstructor.length || 1;
            $("#free-rooms-live").html(freeRoomsDashboard - 1);

	  });
  });
});

$("#patients-waiting").ready(function() {
    $("#patients-waiting > tbody > tr").select(function() {
        $(this).children('td')[3].css({"backgroung-colour": "yellow"});

        alert( "Handler for .select() called." );
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
