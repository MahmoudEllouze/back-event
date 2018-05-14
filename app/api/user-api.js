var express = require('express');
var User = require('./../models/user.js');
var jwt = require('jsonwebtoken');
var i18n = require('./../../config/i18n.js');
var logger = require('./../../config/logger.js');

module.exports = function(app, isLoggedIn){
	
	app.get('/profile', isLoggedIn, function(req, res, logger) {
		i18n.setLocale(req.headers['accept-language']);

		User.findById(req.decoded.id, function(err, user){
			user.password = null;
			res.status(200).json({
				user : user
			});
		})
		
	});
	app.put('/profile', isLoggedIn, function(req, res) {
		i18n.setLocale(req.headers['accept-language']);
		User.findById(req.decoded.id, function(err, user){
			if (err) res.send(err);
			user.firstname = req.body.firstname;
			user.lastname = req.body.lastname;
			user.cin = req.body.cin;
			user.profilePhoto = req.body.profilePhoto;
			user.birthdate = req.body.birthdate;
			user.coordinate.town = req.body.town;
			user.coordinate.country = req.body.country;
			user.coordinate.phoneNumber = req.body.phoneNumber;
			user.socialMedia.facebook = req.body.facebook;
			user.socialMedia.twitter = req.body.twitter;
			user.socialMedia.skype = req.body.skype;
			user.sport.club = req.body.club;
			user.sport.licence = req.body.licence;
			user.sport.professionnal = req.body.professionnal;
			user.sport.height = req.body.height;
			user.sport.weight = req.body.weight;
			user.sport.gender = req.body.gender;
			user.save(function(err){
				if (err) console.log(err);
				logger.info("The user "+ user.firstname + " has been updated. Session : " + req.decoded.id);
				res.status(200).json({message : i18n.__("User updated")});

			})

		})
	});
}