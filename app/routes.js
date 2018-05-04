// app/routes.js
var i18n = require('./../config/i18n.js');
var express = require('express');
var mailer = require('./../config/services.js');

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
				return res.status(200).json({message : i18n.__("Authenticated successfully")});
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
		req.logout();
		return res.status(200).json({message : "logout successful"});
	});

	app.get('/test', isLoggedIn, function(req, res) {
		i18n.setLocale('fr');
		console.log(i18n.__("coud'nt register the user"));
		return res.status(200).json({message : "bien"})
	});
	// var router =  express.Router();
	require('./api/user-api.js')(app, isLoggedIn)
	require('./api/organisation-api.js')(app, isLoggedIn)
	// app.use('/api', router);
	
};

// route middleware to make sure
function isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.status(401).json({message : "unauthaurized"});
}
