var express = require('express');
var Race = require('./../models/race.js');
var jwt = require('jsonwebtoken');
var i18n = require('./../../config/i18n.js');
var logger = require('./../../config/logger.js');


module.exports = function(app, isLoggedIn){

	app.get('/races', isLoggedIn, function(req, res) {
		i18n.setLocale(req.headers['accept-language']);
		Race.find({}, function(err, race){
			if (err) console.log(err);

			if (race==null){
				return res.status(401).json({message : i18n.__("No race found")});
			}

			res.status(200).json(race);
			
		})
	});
	app.post('/race', isLoggedIn, function(req, res) {
		i18n.setLocale(req.headers['accept-language']);
		
		var newRace = new Race();

                var currentDate = new Date();
                newRace.editionId    = req.body.editionId;
                newRace.libeleRace    = req.body.libeleRace;
                newRace.distance    = req.body.distance;
                newRace.presentation    = req.body.presentation;
                newRace.libele    = req.body.libele;
                newRace.dateRace    = req.body.dateRace;
                newRace.hourRace    = req.body.hourRace;

                newRace.labele = req.body.labele;
                newRace.active = true;
                newRace.socialMedia.website = req.body.website;
                newRace.socialMedia.facebook = req.body.facebook;
                newRace.socialMedia.tweeter = req.body.tweeter;
                newRace.creatorId = req.decoded.id;
                newRace.creationDate = currentDate;
                newRace.updateDate = currentDate;

                newRace.save(function(err) {
                	if (err) throw err;
                	logger.info("The race "+ newRace.labele + " has been created. Session : " + req.decoded.id);
                });
                res.status(200).json({
                	message : "Race created succefully"
                });
            });
	app.get('/race/:id_race', isLoggedIn, function(req, res) {
		i18n.setLocale(req.headers['accept-language']);

		Race.findById(req.params.id_race, function(err, race){
			if (err) console.log(err);

			if (race==null){
				return res.status(401).json({message : i18n.__("Race not found")});
			}

			res.status(200).json(race);
			
		})
	});
	app.put('/race/:id_race', isLoggedIn, function(req, res) {
		i18n.setLocale(req.headers['accept-language']);
		Race.findById(req.params.id_race, function(err, race){
			if (err) res.send(err);
			var currentDate = new Date();

                race.libeleRace    = req.body.libeleRace;
                race.distance    = req.body.distance;
                race.presentation    = req.body.presentation;
                race.libele    = req.body.libele;
                race.dateRace    = req.body.dateRace;
                race.hourRace    = req.body.hourRace;

                race.labele = req.body.labele;
                race.socialMedia.website = req.body.website;
                race.socialMedia.facebook = req.body.facebook;
                race.socialMedia.tweeter = req.body.tweeter;
                race.updateDate = currentDate;

			race.save(function(err){
				if (err) console.log(err);
				logger.info("The race "+ race.libeleRace + " has been updated. Session : " + req.decoded.id);
				res.status(200).json({message : i18n.__("Race updated")});

			})
			
		})
	});
}