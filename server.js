const express = require('express');
var app = express();
var path  = require('path');

var port =  process.env.PORT || 3000;

app.use(express.static(__dirname + '/views'));

app.get('/',function(req,res){
  res.sendFile('index.html');
  //__dirname : It will resolve to your project folder.
});

app.get('/about',function(req,res){
  res.sendFile('about.html');
});

app.get('/sitemap',function(req,res){
  res.sendFile('sitemap.html');
});

app.listen(port);
console.log('The site is running on port', port);
