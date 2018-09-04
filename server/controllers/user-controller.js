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

module.exports.addAdmin = function(req, res) {
	var createAdmin={
		user_email:req.body.user_email,
		user_name:req.body.user_name,
		user_password:encrypt('Change@Pwd'+req.body.user_name),
		user_type:'admin'
	};
	
	req.checkBody('user_email', "Enter valid email address.").notEmpty().isEmail();
	req.checkBody('user_name', "Missing name.").notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		console.log('Errors in add user');
		res.status(422).json(errors);
        return;
	} else {
	connection.query('INSERT INTO users SET ?', createAdmin, function(error, recommendation, fields) {
		if (error) {
			res.status(500).json(error);
		} else {
			res.status(200).end();
		}		
	});
	}
};

module.exports.deleteUser = function(req, res) {
	var user_email = req.param('user_email');
	
	connection.query('DELETE FROM users WHERE user_email = ?', user_email, function(error, recommendation, fields) {
		if (error) {
			res.status(500).json(error);
		} else {
			res.status(200).end();
		}		
	});
};