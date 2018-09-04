var express = require("express");
var connection = require('./../dbconnection');
var crypto = require('crypto'),
algorithm = 'aes-256-ctr',
password = 'd6F3Efeq';

function encrypt(text){
var cipher = crypto.createCipher(algorithm,password);
var crypted = cipher.update(text,'utf8','hex');
crypted += cipher.final('hex');
return crypted;
}

module.exports.register = function(req, res) {
	var email = req.body.user_email;
	var name = req.body.user_name;
	var password = req.body.user_password;

	var users = {
		"user_email" : req.body.user_email,
		"user_name" : req.body.user_name,
		"user_password" :  encrypt(req.body.user_password),
		"user_type" : "user"
	};
	
	req.checkBody('user_email', "Enter a valid email address.").notEmpty().isEmail();
	req.checkBody('user_name', "Enter a valid name.").len(2,20);
	req.checkBody('user_password','Enter a password 6 - 20.').len(6,20);

	var errors = req.validationErrors();
	if (errors) {
		console.log('Errors in entred details');
		res.status(422).json(errors);
        return;
	} else {
		connection.query('INSERT INTO users SET ?', users,
				function(error, rows) {
					if (error) {
						res.status(500).send(error);
						return;
					} else {
						res.status(200).end();
						console.log('user registered sucessfully');
						return;
						}
				});
	}};

	module.exports.beforeRegister = function(req, res) {
		console.log('Before register');
	};