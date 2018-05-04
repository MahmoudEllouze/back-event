var express = require('express');
var User = require('./../models/user.js');

module.exports = function(app, isLoggedIn){
	app.get('/profile', isLoggedIn, function(req, res) {
		console.log(req.user);
		console.log(req.user.id);
		res.status(200).json({
			user : req.user
		});
	});
	app.put('/profile', isLoggedIn, function(req, res) {
		console.log(req.user.id);
		
		User.findById(req.user.id, function(err, user){
			if (err) res.send(err);
			user.data.firstname = req.body.firstname;
			user.data.lastname = req.body.lastname;
			user.data.cin = req.body.cin;
			user.save(function(err){
				if (err) console.log(err);
				res.status(200).json({message : "User updated"})

			})
			
		})
	});
}