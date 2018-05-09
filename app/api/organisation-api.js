var express = require('express');
var Organisation = require('./../models/organisation.js');
var jwt = require('jsonwebtoken');
var i18n = require('./../../config/i18n.js');
module.exports = function(app, isLoggedIn){

	app.get('/organisations', isLoggedIn, function(req, res) {
		i18n.setLocale(req.headers['accept-language']);
		Organisation.find({},'id companyName email tradeRegister', function(err, organisation){
			if (err) console.log(err);

			if (organisation==null){
				return res.status(401).json({message : i18n.__("No organisation found")});
			}

			res.status(200).json(organisation);
			
		})
	});
	app.post('/organisation', isLoggedIn, function(req, res) {
		i18n.setLocale(req.headers['accept-language']);
		
		var newOrg = new Organisation();

                // set the user's local credentials
                newOrg.companyName    = req.body.companyName;
                newOrg.description = req.body.description;
                newOrg.email = req.body.email;
                newOrg.tradeRegister = req.body.tradeRegister;
                newOrg.patent = req.body.patent;
                newOrg.foundationDate = req.body.foundationDate;
                newOrg.logo = req.body.logo;
                newOrg.legalRepresentant = req.body.legalRepresentant;
                newOrg.coordinate.country = req.body.country;
                newOrg.coordinate.adress = req.body.adress;
                newOrg.coordinate.town = req.body.town;
                newOrg.coordinate.postalCode = req.body.postalCode;
                newOrg.coordinate.phoneNumber = req.body.phoneNumber;
                newOrg.creator = req.decoded.id;


                newOrg.save(function(err) {
                    if (err)
                        throw err;
                });
		res.status(200).json({
			message : "Organisation created succefully"
		});
	});
	app.get('/organisation/:id_org', isLoggedIn, function(req, res) {
		i18n.setLocale(req.headers['accept-language']);

		Organisation.findById(req.params.id_org, function(err, organisation){
			if (err) console.log(err);

			if (organisation==null){
				return res.status(401).json({message : i18n.__("Organisation not found")});
			}

			res.status(200).json(organisation);
			
		})
	});
	app.put('/organisation/:id_org', isLoggedIn, function(req, res) {
		i18n.setLocale(req.headers['accept-language']);
		Organisation.findById(req.params.id_org, function(err, organisation){
			if (err) res.send(err);
			organisation.companyName = req.body.companyName;
			organisation.email = req.body.email;
			organisation.tradeRegister = req.body.tradeRegister;

			organisation.save(function(err){
				if (err) console.log(err);
				res.status(200).json({message : i18n.__("Organisation updated")})

			})
			
		})
	});
}