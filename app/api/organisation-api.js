var express = require('express');
var Organisation = require('./../models/organisation.js');

module.exports = function(app, isLoggedIn){
	app.get('/organisations', isLoggedIn, function(req, res) {

		Organisation.find({},'id, name', function(err, organisation){
			if (err) console.log(err);

			if (organisation==null){
				return res.status(401).json({message : "No organisation found"});
			}

			res.status(200).json(organisation);
			
		})
	});
	app.post('/organisation', isLoggedIn, function(req, res) {
		var newOrg = new Organisation();

                // set the user's local credentials
                newOrg.name    = req.body.name;
                newOrg.email = req.body.email;
                newOrg.matriculation = req.body.matriculation;
                newOrg.creator = req.user.id;


                newOrg.save(function(err) {
                    if (err)
                        throw err;
                });
		res.status(200).json({
			message : "Organisation created succefully"
		});
	});
	app.get('/organisation/:id_org', isLoggedIn, function(req, res) {

		Organisation.findById(req.params.id_org, function(err, organisation){
			if (err) console.log(err);

			if (organisation==null){
				return res.status(401).json({message : "Organisation not found"});
			}

			res.status(200).json(organisation);
			
		})
	});
	app.put('/organisation/:id_org', isLoggedIn, function(req, res) {
		
		Organisation.findById(req.params.id_org, function(err, organisation){
			if (err) res.send(err);
			organisation.name = req.body.name;
			organisation.email = req.body.email;
			organisation.matriculation = req.body.matriculation;
			organisation.save(function(err){
				if (err) console.log(err);
				res.status(200).json({message : "Organisation updated"})

			})
			
		})
	});
}