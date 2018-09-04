var connection = require('./../dbconnection');
var crypto = require('crypto'),
algorithm = 'aes-256-ctr',
password = 'd6F3Efeq';

function decrypt(text){
	  var decipher = crypto.createDecipher(algorithm,password);
	  var dec = decipher.update(text,'hex','utf8');
	  dec += decipher.final('utf8');
	  return dec;
	}

module.exports.login=function(req,res){
	var session = req.session; 
    var email=req.body.user_email_login;
    var password=req.body.user_password_login;
   
   
    connection.query('SELECT * FROM users WHERE user_email = ?',[email], function (error, results, fields) {
      
       if(results.length >0){
            if(password===decrypt(results[0].user_password)){
            	req.session.user = results[0];
            	console.log('user logged in sucessfully');
            	res.status(200).send(results);
            }else{
            	res.status(422).end();
            	console.log('Email and password doesnt match');
            	return;
            }
          
        } else{
        	res.status(422).end();
        	console.log('Email doesnt exists');
        	return;
        }
    });
};
module.exports.beforeLogin = function(req, res) {
	console.log('Before login');
};