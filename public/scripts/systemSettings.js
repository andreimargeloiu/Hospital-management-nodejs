/*
    Fucntion to create the table with diseases from the system
*/
var hostname = "http://localhost:3000/";

// fill the diseases table
$(document).ready(function() {
    var diseasesAPI = hostname + "app/getdiseases/";

    $.getJSON(diseasesAPI).done(function(allDiseases) {
           var diseasesScoresCheckboxes = [];

           for(var disease in allDiseases) {
             var diseaseScoreCheckbox = [];
        	   diseaseScoreCheckbox[0] = disease;
        	   diseaseScoreCheckbox[1] = allDiseases[disease]; // This is the score.
             diseaseScoreCheckbox[2] = "<input type=\"checkbox\" name=\"DD[]\" value=\"" + disease + "\">";

        	   diseasesScoresCheckboxes.push(diseaseScoreCheckbox)
           }

           $('#diseases-table').dataTable({
		      data: diseasesScoresCheckboxes,
		      columns:[{
	              title: "Disease",
                  width: "50%"
	          },{
	              title: "Score",
                  width: "20%"
	          },{
	              title: "Select",
                  width: "30%"
	          }],
		      scrollY: '40vh',
		      scrollCollapse: true,
		      paging: false,
                info: false,
                language: {
                  searchPlaceholder: "Search disease...",
                  sSearch: ""
                },
		 });
    });
});


// fill the rooms table
$(document).ready(function() {
    var roomsAPI = hostname + "app/getrooms/";

    $.getJSON(roomsAPI).done(function(allRooms) {
           var roomsScoresCheckboxes = [];

           for(var room in allRooms) {
               if (room !== 'noroom') {
                    var roomScoreCheckbox = [];
                    roomScoreCheckbox[0] = room;
                    roomScoreCheckbox[1] = "<input type=\"checkbox\" name=\"RD[]\" value=\"" + room + "\">";

                    roomsScoresCheckboxes.push(roomScoreCheckbox);
               }
           }

           $('#rooms-table').dataTable({
		      data: roomsScoresCheckboxes,
		      columns:[{
	              title: "Room",
                  width: "60%"
                },{
	              title: "Select",
                  width: "40%"
	           }],
		      scrollY: '40vh',
		      scrollCollapse: true,
		      paging: false,
                info: false,
                language: {
                  searchPlaceholder: "Search room...",
                  sSearch: ""
                },
		 });
    });
});
