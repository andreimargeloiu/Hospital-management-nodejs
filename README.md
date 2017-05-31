# About Project
It's a web application for managing hospitals rooms and determining the patient's priority for isolation. The app provides a centralised hub for managing the patients and planning their distribution across hospital’s rooms. It allows nurses to keep track of the patients and their diseases in real time and to have an overview over the patients and rooms, and better manage the rooms assignment across patients.

# Live demo
https://nhs-app.herokuapp.com/
* username: admin
* password: admin

# Youtube video
<a href="http://www.youtube.com/watch?feature=player_embedded&v=Q9wTakyRWi4
" target="_blank"><img src="http://img.youtube.com/vi/Q9wTakyRWi4/0.jpg" 
alt="Youtube video" width="240" height="180" border="10" /></a>

# Prerequisites
1. Node.js 6.9.1 or later - install from https://nodejs.org/

# Installing - easy
1.	Download the zip file.
2.	Extract the NHS app folder.
3.	Open the Terminal (Linux & MacOS) or PowerShell (Windows) and change directory to the project folder.
4.	Type ‘npm install’ in the Terminal (PowerShell) and press Enter. All the dependencies would be installed.
5.	Go back to the Terminal (PowerShell) and be sure that you are pointing inside the project folder. To open the application, type ‘node app.js’ and press Enter.
6.	The application should be live on the local port 3000.  
7.	Type http://localhost:3000/ into a browser.
8.	To login use the username: admin  and the password: admin
9.	Now you should be inside the application

# System manual

###
C. System manual
**The application is divided into modules.**


**Code organisation**

Folder	Content	Responsability
/public		Contains the public files, such as CSS, fonts and scripts.
/routes		Manage the HTTP requests. Is divided into smaller modules responsible for disjoint tasks.
	/app.js	Renders dashboard page
	/disease.js	Responsible for diseases
	/login.js	Responsible for logging in
	/patients.js	Responsible for patients
	/rooms.js	Responsible for rooms
	/settings.js	Renders settings page
	/users.js	Add new users and logout
/server		Defines the database and Schemas
	/db/mongoose.js	Database settings
	/models	Defines Schemas
/views		Render pages
	/layouts	The core layout; each page is rendered inside the layout
	/(other files)	Contains specific visual changes for every page
Table 4.4 - Code organisation

The available application is connected to a MongoDB database online. If you want to change the database to another one, you need to go:
NHS app folder -> server -> db -> mongoose.js

Inside the file, you need to change the database link from
mongoose.connect("mongodb://admin:admin123@ds145220.mlab.com:45220/nhs-app"); to mongoose.connect("your-database-link");



