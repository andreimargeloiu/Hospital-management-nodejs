// GET /app/settings         -> go the settings

const express = require('express');
const router = express.Router();

var {scoreOfDisease, Disease} = require('./../server/models/diseases.js');
/*
    GET /app/settings -> go the settings
*/
router.get('/app/settings', (req, res) => {
    res.render('settings', {pageTitle: "Settings"});
});

router.get('/app/systemsettings', (req, res) => {
    res.render('systemsettings', {pageTitle: "System settings"});
});

module.exports = router;
