var express = require('express');
var Organisation = require('./../models/organisation.js');

module.exports = function(app, isLoggedIn){
	app.get('/organisations', isLoggedIn, function(req, res) {

		Organisation.find({},'id, data.name', function(err, organisation){
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
                newOrg.data.name    = req.body.name;
                newOrg.data.email = req.body.email;
                newOrg.data.matriculation = req.body.matriculation;


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
			organisation.data.name = req.body.name;
			organisation.data.email = req.body.email;
			organisation.data.matriculation = req.body.matriculation;
			organisation.save(function(err){
				if (err) console.log(err);
				res.status(200).json({message : "Organisation updated"})

			})
			
		})
	});
}