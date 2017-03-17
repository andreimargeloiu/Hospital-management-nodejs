//  $(document).ready(function () {
//       var flickerAPI = "http://localhost:3000/app/getdiseases";
//       $.getJSON(flickerAPI).done(function(data) {
//
//           var form = $("<form/>", {
//               action:'/app/addpatient',
//               method: 'post'
//           });
//
//           for (var prop in data) {
//               if (data.hasOwnProperty(prop)) {
//                   form.append('<input type="checkbox" name="PD[]" value="' + prop + '" >' + prop + '   ---   ' + data[prop] + '<br>');
//               }
//           }
//
//           form.append('<input type="submit" value="Submit">');
//
//           $("#show-diseases-form").append(form);
//       });
// });

$(document).ready(function()
                  {
                      var diseasesAPI = "http://localhost:3000/app/getdiseases";
                      $.getJSON(diseasesAPI).done(function(allDiseases)
                                                  {
                                                      var diseasesScoresCheckboxes = [];

                                                      for(var disease in allDiseases)
                                                      {
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
                                                                                          scrollY: '60vh',
                                                                                          scrollCollapse: true,
                                                                                          paging: false,
                                                                                          info: false
                                                                                      });
                                                  });
                  });
