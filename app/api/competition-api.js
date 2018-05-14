var express = require('express');
var Competition = require('./../models/competition.js');
var jwt = require('jsonwebtoken');
var i18n = require('./../../config/i18n.js');
var logger = require('./../../config/logger.js');


module.exports = function(app, isLoggedIn){

	app.get('/competitions', isLoggedIn, function(req, res) {
		i18n.setLocale(req.headers['accept-language']);
		Competition.find({}, function(err, competition){
			if (err) console.log(err);

			if (competition==null){
				return res.status(401).json({message : i18n.__("No competition found")});
			}

			res.status(200).json(competition);
			
		})
	});
	app.post('/competition', isLoggedIn, function(req, res) {
		i18n.setLocale(req.headers['accept-language']);
		
		var newComp = new Competition();

                var currentDate = new Date();
                newComp.presentation    = req.body.presentation;
                newComp.labele = req.body.labele;
                newComp.active = true;
                newComp.socialMedia.website = req.body.website;
                newComp.socialMedia.facebook = req.body.facebook;
                newComp.socialMedia.tweeter = req.body.tweeter;
                newComp.creatorId = req.decoded.id;
                newComp.creationDate = currentDate;
                newComp.updateDate = currentDate;
                newComp.organisationId = req.body.organisationId;

                newComp.save(function(err) {
                	if (err) throw err;
                	logger.info("The competition "+ newComp.labele + " has been created. Session : " + req.decoded.id);
                });
                res.status(200).json({
                	message : "Competition created succefully"
                });
            });
	app.get('/competition/:id_comp', isLoggedIn, function(req, res) {
		i18n.setLocale(req.headers['accept-language']);

		Competition.findById(req.params.id_comp, function(err, Competition){
			if (err) console.log(err);

			if (Competition==null){
				return res.status(401).json({message : i18n.__("Competition not found")});
			}

			res.status(200).json(Competition);
			
		})
	});
	app.put('/competition/:id_comp', isLoggedIn, function(req, res) {
		i18n.setLocale(req.headers['accept-language']);
		Competition.findById(req.params.id_comp, function(err, competition){
			if (err) res.send(err);

			    var currentDate = new Date();
                competition.presentation    = req.body.presentation;
                competition.labele = req.body.labele;
                competition.active = true;
                competition.socialMedia.website = req.body.website;
                competition.socialMedia.facebook = req.body.facebook;
                competition.socialMedia.tweeter = req.body.tweeter;
                competition.updateDate = currentDate;

				competition.save(function(err){
				if (err) console.log(err);
				logger.info("The Competition "+ competition.labele + " has been updated. Session : " + req.decoded.id);
				res.status(200).json({message : i18n.__("Competition updated")});

			})
			
		})
	});
}