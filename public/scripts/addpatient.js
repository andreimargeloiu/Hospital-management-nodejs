var URL = location.protocol + '//' + location.host;

$(document).ready(function() {
    var diseasesAPI = URL + "/app/getdiseases";
    $.getJSON(diseasesAPI).done(function(allDiseases) {
         var diseasesScoresCheckboxes = [];

         for(var disease in allDiseases) {
             var diseaseScoreCheckbox = [];
             diseaseScoreCheckbox[0] = disease;
             diseaseScoreCheckbox[1] = allDiseases[disease]; // This is the score.

             var input = "<input type=\"checkbox\" name=\"PD[]\" value=\"" + disease + "\">";
             diseaseScoreCheckbox[2] = input;

             diseasesScoresCheckboxes.push(diseaseScoreCheckbox)
         }

         $('#add-new-patient').dataTable({
               data: diseasesScoresCheckboxes,
               columns:
               [
                   {
                       title: "Disease"
                   },
                   {
                       title: "Score"
                   },
                   {
                       title: "Diagnosis"
                   },
               ],
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

/*
     Google analytics
*/
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-97568701-1', 'auto');
ga('send', 'pageview');
