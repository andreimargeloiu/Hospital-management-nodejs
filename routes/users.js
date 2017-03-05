const express = require('express');
const router = express.Router();
const passport = require ('passport');
const LocalStrategy = require ('passport-local').Strategy;
const User = require('./../server/models/user.js');

/*
    GET Add User
*/
router.get('/app/adduser', (req, res) => {
    res.render('adduser');
});

/*
    POST Register User -> when the form get submitted
*/
router.post('/app/adduser', (req, res) => {
	var username = req.body.username;
	var password = req.body.password;

    // validation
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();

    // if there are errors, flash messages on the screen
    var errors = req.validationErrors();
    if(errors) {
        res.render('adduser', {
            errors: errors
        });
    } else {
        // if everything is OK, create a new user in the database
        var newUser = new User({
            username,
            password
        });

        User.createUser(newUser, function(err, user) {
            if (err) {
                return ;
            }
        });

        req.flash('success_msg', 'User succesfully created');
        res.redirect('/app/adduser');
    }
});

router.get('/app/logout', function(req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');

    res.redirect('/');
});

module.exports = router;
