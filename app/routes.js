// app/routes.js
var i18n = require('./../config/i18n.js');
var express = require('express');
var mailer = require('./../config/services.js');
var secret = '12312';
var jwt = require('jsonwebtoken');
var logger = require('./../config/logger.js');
var rbac = require('./../config/rbac.js');
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.post('/login', function(req, res, next) {
		passport.authenticate('local-login', function(err, user, info) {
			i18n.setLocale(req.headers['accept-language']);
			if (err) { return next(err); }
			if (!user) { 
				return res.status(401).json({message : i18n.__(info)}) 
			}
			req.logIn(user, function(err) {
				if (err) { return next(err); }
				var token = jwt.sign({id : user._id}, secret, {expiresIn : 5*360});
				logger.info("The user "+ user.firstname + " has logged in. Session : " + user._id);
				return res.status(200).json({message : i18n.__("Authenticated successfully"), token: token});
			});
		})(req, res, next);
	});


	// process the signup form
	app.post('/signup', function(req, res, next) {

		passport.authenticate('local-signup', function(err, user, info) {
			i18n.setLocale(req.headers['accept-language']);

			if (err) { 
				return res.status(500).json({message : i18n.__(info)}) }

			if (!user) { 
				return res.status(401).json(info) 
			}

			req.logIn(user, function(err) {
				if (err) { return next(err); }
				return res.status(200).json({message : i18n.__("Registred successfully")});
			});
		})(req, res, next);
	});


	


	app.get('/logout', function(req, res) {
		i18n.setLocale(req.headers['accept-language']);
		req.logout();
		return res.status(200).json({message : i18n.__("Logout successful")});
	});
	app.get('/hero', function(req, res) {
		return res.status(200).json([
      { id: 11, name: 'Mr. Mahmoud' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }]);
	});

	
	// var router =  express.Router();
	require('./api/user-api.js')(app, isLoggedIn)
	require('./api/organisation-api.js')(app, isLoggedIn)
	require('./api/competition-api.js')(app, isLoggedIn)
	require('./api/edition-api.js')(app, isLoggedIn)
	require('./api/race-api.js')(app, isLoggedIn)
	// app.use('/api', router);
	
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	var token = req.headers['authorization'];

    if (token) {
        token = token.replace('Bearer ', '')
    }
	// if user is authenticated in the session, carry on
	jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
        } else {

            req.decoded = jwt.decode(token);
            return next();
        }
    });
	// if (req.isAuthenticated())
	// 	return next();

	// // if they aren't redirect them to the home page
	// res.status(401).json({message : "Unauthaurized"});
}
