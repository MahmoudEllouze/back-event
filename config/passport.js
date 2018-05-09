// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var i18n = require('./i18n.js');
// load up the user model
var User       		= require('../app/models/user');
var logger = require('./logger.js');
// expose this function to our app using module.exports
module.exports = function(passport) {


    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        i18n.setLocale(req.headers['accept-language']);

        User.findOne({ 'email' :  email}, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, [{name: 'email' , error: 'That email is already taken.'}]);
            } else {

				// if there is no user with that email
                // create the user
                var newUser  = new User();

                // set the user's local credentials
                newUser.email    = email;
                newUser.password = newUser.generateHash(password);
                newUser.firstname = req.body.firstname;
                newUser.lastname = req.body.lastname;
                newUser.cin = req.body.cin;
                newUser.profilePhoto = req.body.profilePhoto;

                 // use the generateHash function in our user model

				// save the user
                newUser.save(function(err) {
                    if (err) {
                        var errors =[]
                        if (err.code == 11000) {
                            errors.push({name: 'cin', error: 'cin must be unique'})
                        }
                        for (var errName in err.errors) {
                            errors.push({name: errName, error: i18n.__(err.errors[errName].message)})
                            
                        }
                        return done(null, false, errors);
                    }
                    return done(null, newUser);
                });
            }

        });

    }));


    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        console.log('email');
        console.log(password);
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, 'User not found.'); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, 'Invalid password.'); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });

    }));

};
