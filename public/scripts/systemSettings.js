/*
    Fucntion to create the table with diseases from the system
*/
$(document).ready(function() {
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // Chaneg the index of the array NHSnumbr when giving into production
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    var diseasesAPI = "http://localhost:3000/app/getdiseases/";

    $.getJSON(diseasesAPI).done(function(allDiseases) {
           var diseasesScoresCheckboxes = [];

           for(var disease in allDiseases) {
               var diseaseScoreCheckbox = [];
        	   diseaseScoreCheckbox[0] = disease;
        	   diseaseScoreCheckbox[1] = allDiseases[disease]; // This is the score.
          	   diseaseScoreCheckbox[2] = "<input type=\"checkbox\" name=\"DD[]\" value=\"" + disease + "\">";

        	   diseasesScoresCheckboxes.push(diseaseScoreCheckbox)
           }
        //    console.log(diseasesScoresCheckboxes);

           $('#diseases-table').dataTable({
		      data: diseasesScoresCheckboxes,
		      columns:[{
	              title: "Disease"
	          },{
	              title: "Score"
	          },{
	              title: "Delete from system"
	          }],
		      scrollY: '40vh',
		      scrollCollapse: true,
		      paging: false,
              info: false,
              language: {
                 sSearch: "Search disease"
              }
		   });
    });
});
