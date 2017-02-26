const express = require('express');

var app = express();
var port = process.env.PORT || 3000;

app.get('/', (req, res) => {
      res.send('Team 42 NHS app');
});

app.listen(port);
