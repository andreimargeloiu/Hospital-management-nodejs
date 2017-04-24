/*
 	POST /app/adduser -> add a new user in the system
     GET /logout       -> log the user out of the system
*/

const express = require('express');
const router = express.Router();
const passport = require ('passport');
const LocalStrategy = require ('passport-local').Strategy;
const User = require('./../server/models/user.js');

/*
    POST /app/adduser ->  add a new user in the system
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
        res.status(400).redirect('systemsettings');
    } else {
        // if everything is OK, create a new user in the database
        var newUser = new User({
            username,
            password
        });

        User.createUser(newUser, function(err, user) {
            if (err) {
				console.log(err);
                return ;
            }
        });

        req.flash('success_msg', 'User succesfully created');
        res.status(200).redirect('/app/systemsettings');
    }
});

/*
	GET /app/logout -> function to logout from the system
*/
router.get('/app/logout', function(req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');

    res.status(200).redirect('/');
});

module.exports = router;
