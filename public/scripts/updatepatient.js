// Add execution whilst clicked on a specific row in the dashboard.
$(document).ready(function()
                  {
	                    var patientAPI = "http://localhost:3000/app/getpatient/58c7e285b8a86f23846cb966";
	                    // Add app/getpatient/:NHSnumber route.
	                    $.getJSON(patientAPI).done(function(patient)
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

									                                                	   var input;

									                                                	   for(var i = 0; i < patient["diseases"].length; i++)
									                                                	   {
									                                                	   	   if(disease === patient["diseases"][i])
									                                                	   	   {
									                                                	   	   	   input = "<input type=\"checkbox\" checked>";
									                                                	   	   	   break;
									                                                	   	   }
									                                                	   	   else
									                                                	   	   {
									                                                	   	       input = "<input type=\"checkbox\">";
									                                                	   	   }
									                                                	   }

									                                                	   console.log(input);

									                                                	   diseaseScoreCheckbox[2] = input;

									                                                	   diseasesScoresCheckboxes.push(diseaseScoreCheckbox) 
									                                                   }

									                                                   // Add name, sex, number, age before the table.

									                                                   $('#diagnosis').dataTable({
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
																												      scrollY: '50vh',
																												      scrollCollapse: true,
																												      paging: false
									      																		});
									                                               });
	                                               });
	              });