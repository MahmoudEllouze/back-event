var express = require('express');
var Edition = require('./../models/edition.js');
var jwt = require('jsonwebtoken');
var i18n = require('./../../config/i18n.js');
var logger = require('./../../config/logger.js');


module.exports = function(app, isLoggedIn){

	app.get('/editions', isLoggedIn, function(req, res) {
		i18n.setLocale(req.headers['accept-language']);
		Edition.find({}, function(err, edition){
			if (err) console.log(err);

			if (edition==null){
				return res.status(401).json({message : i18n.__("No editions found")});
			}

			res.status(200).json(edition);
			
		})
	});
	app.post('/edition', isLoggedIn, function(req, res) {
		console.log(req.body);
		i18n.setLocale(req.headers['accept-language']);
		
		var newEd = new Edition();

                var currentDate = new Date();
                newEd.competitionId    = req.body.competitionId;
                newEd.presentation = req.body.presentation;
                newEd.numero = req.body.numero;
                newEd.active = true;
                newEd.creationDate = currentDate;
                newEd.updateDate = currentDate;

                newEd.dosar = req.body.dosar;
                newEd.contact = req.body.contact;
                newEd.responsable = req.body.responsable;
                newEd.rules = req.body.rules;
                newEd.service = req.body.service;
                newEd.socialMedia = req.body.socialMedia;

                newEd.creatorId = req.decoded.id;

                newEd.save(function(err) {
                	if (err) throw err;
                	logger.info("The edition "+ newEd.labele + " has been created. Session : " + req.decoded.id);
                });
                res.status(200).json({
                	message : "Edition created succefully"
                });
            });
	app.get('/edition/:id_ed', isLoggedIn, function(req, res) {
		i18n.setLocale(req.headers['accept-language']);

		Edition.findById(req.params.id_ed, function(err, edition){
			if (err) console.log(err);

			if (edition==null){
				return res.status(401).json({message : i18n.__("Edition not found")});
			}

			res.status(200).json(edition);
			
		})
	});
	app.put('/edition/:id_ed', isLoggedIn, function(req, res) {
		i18n.setLocale(req.headers['accept-language']);
		Edition.findById(req.params.id_ed, function(err, edition){
			if (err) res.send(err);

				edition.presentation = req.body.presentation;
                edition.numero = req.body.numero;
                edition.active = true;
                edition.numero = req.body.numero;
                edition.creationDate = currentDate;
                edition.updateDate = currentDate;

                edition.dosar = req.body.dosar;
                edition.contact = req.body.contact;
                edition.responsable = req.body.responsable;
                edition.rules = req.body.rules;
                edition.service = req.body.service;
                edition.socialMedia = req.body.socialMedia;

			edition.save(function(err){
				if (err) console.log(err);
				logger.info("The edition "+ edition.id + " has been updated. Session : " + req.decoded.id);
				res.status(200).json({message : i18n.__("Edition updated")});

			})
			
		})
	});
}