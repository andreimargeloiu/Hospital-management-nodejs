// route -> /users

const express = require('express');
const router = express.Router();
const passport = require ('passport');
const LocalStrategy = require ('passport-local').Strategy;

const User = require('./../server/models/user.js');

// GET Register page
router.get('/register', function(req, res) {
    res.render('register');
});

// GET Login page
router.get('/login', function(req, res) {
    res.render('login', {layout: false});
});

// POST Register User -> when the form get submitted
router.post('/register', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;

    // validation
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();

    // if there are errors, flash messages on the screen
    var errors = req.validationErrors();
    if(errors) {
        res.render('register', {
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
                throw err;
            }
            console.log(user);
        });

        // flash success message
        req.flash('success_msg', 'You are registered and can now login');
        res.redirect('/users/login');
    }
});

// the Middleware for authetification -> provided by the passport library
passport.use(new LocalStrategy(
  function(username, password, done) {
      User.getUserByUsername(username, function(err, user) {
          if (err) {
              throw err;
          }
          if (! user) {
              //     done(error, found the user)
              return done(null, false, {message: "Unknown User"});
          }

          User.comparePassword(password, user.password, function (err, isMatch) {
              if (err) {
                  throw err;
              }
              if (isMatch) {
                  return done(null, user);
              } else {
                  return done(null, false, 'Invalid password');
              }
          });
      });
  }));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    }), function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.redirect('/');

        // res.redirect('/users/' + req.user.username);
    }
);

router.get('/logout', function(req, res) {
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
});

module.exports = router;
