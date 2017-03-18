var patientsWaitingTableConstructor = [];
var patientsInHospitalTableConstructor = [];
var freeRoomsTableConstructor = [];
var dynamicTable;
var dynamicTableClickable = true;

$(document).ready(function()
				  {
					  var patientsAPI = "http://localhost:3000/app/getpatients";
				      $.getJSON(patientsAPI).done(function(patients)
				      							  {
				      								  var roomsAPI = "http://localhost:3000/app/getrooms";
				      								  $.getJSON(roomsAPI).done(function(rooms1)
				      								 						  {
																			  	  for(var room in rooms1["rooms"])
																			  	  {
																				  	  var freeRoomsRowConstructor = [];
																				  	  var iterator = 0;

																				  	  console.log(room);

																				  	  for(var i = 0; i < patients.length; i++)
																				  	  {
																				  	  	  if(room !== patients[i]["room"])
																				  	  	  {
																				  	  	  	  iterator++;
																				  	  	  }
																				  	  }
																				  	  if(iterator === patients.length)
																				  	  {
																				  	  	  freeRoomsRowConstructor.push(room);

																				  	  	  freeRoomsTableConstructor.push(freeRoomsRowConstructor);
																				  	  }
																				  }

																				  console.log(freeRoomsRowConstructor);
																				  console.log(freeRoomsTableConstructor);

																				  for(var i = 0; i < patients.length; i++)
																				  {
																					  var patient = patients[i];

																					  var patientsRowConstructor = [];
																					  patientsRowConstructor.push(patient["NHSnumber"]);
																					  patientsRowConstructor.push(patient["firstName"] + " " + patient["lastName"]);

																					  if(patient["room"] === "no room")
																					  {
																					  	  patientsRowConstructor.push(patient["score"]);

																					  	  patientsWaitingTableConstructor.push(patientsRowConstructor);
																					  }
																					  else
																					  {
																					  	  patientsRowConstructor.push(patient["room"]);
																					  	  patientsRowConstructor.push(patient["score"]);

																					  	  patientsInHospitalTableConstructor.push(patientsRowConstructor);
																					  }
																				  }

																				  $('#patients-waiting').dataTable({
																												       data: patientsWaitingTableConstructor,
																												       columns:
																												       [
																												       	   {
																												       	   	   title: "NHSnumber"
																												       	   },
																												           {
																												           	   title: "Name"
																												           },
																												           {
																												           	   title: "Score"
																												           }
																												       ],
																												       scrollY: '60vh',
																												       scrollCollapse: true,
																												       paging: false,
																												       resposnive: true,
																												       info: false
																												   });

																				  dynamicTable = $('#patients-in-hospital-or-free-rooms').DataTable({
																								    									   				data: patientsInHospitalTableConstructor,
																																				        columns:
																																				        [
																																				            {
																																				                title: "NHSnumber"
																																				            },
																																				            {
																																				           	    title: "Name"
																																				            },
																																				            {
																																				           	    title: "Room"
																																				            },
																																				            {
																																				           	    title: "Score"
																																				            }
																																				        ],
																																				        scrollY: '60vh',
																																				        scrollCollapse: true,
																																				        paging: false,
																																				        resposnive: true,
																																				        info: false
																																                    });
																			  });
				      							  });
				  });



$("body").on('click', '#patients-in-hospital-or-free-rooms > tbody > tr', function()
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
$("body").on('click', '#patientsInRooms', function()
  									      {
  											  dynamicTable.destroy();
  											  $('#patients-in-hospital-or-free-rooms').empty();
  											  dynamicTable = $('#patients-in-hospital-or-free-rooms').DataTable({
															    									   				data: patientsInHospitalTableConstructor,
																											        columns:
																											        [
																											            {
																											                title: "NHSnumber"
																											            },
																											            {
																											                title: "Name"
																											            },
																											            {
																											                title: "Room"
																											            },
																											            {
																											                title: "Score"
																											            }
																											        ],
																											        scrollY: '60vh',
																											        scrollCollapse: true,
																											        paging: false,
																											        resposnive: true,
																											        info: false
																											    });
  											  dynamicTableClickable = true;
  										  });
$("body").on('click', '#freeRooms', function()
								    {
									    dynamicTable.destroy();
									    $('#patients-in-hospital-or-free-rooms').empty();
									    dynamicTable = $('#patients-in-hospital-or-free-rooms').DataTable({
														    									        	  data: freeRoomsTableConstructor,
																							            	  columns:
																							            	  [
																							                	  {
																							                    	  title: "Room"
																							                	  }
																							            	  ],
																							            	  scrollY: '60vh',
																							            	  scrollCollapse: true,
																							            	  paging: false,
																							            	  resposnive: true,
																							            	  info: false
																							              });
									    dynamicTableClickable = false;
								    });
