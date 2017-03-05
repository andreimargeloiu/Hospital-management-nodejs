const express = require('express');
const router = express.Router();

/*
    GET /app/ -> simply render the page
*/
router.get('/app', (req, res) => {
    res.render('dashboard');
});

/*
    POST /addPatient -> adds new patient
*/
router.post('/app/addpatient', (req, res) => {
    console.log(req.body);
    res.render('dashboard');
});




module.exports = router;
