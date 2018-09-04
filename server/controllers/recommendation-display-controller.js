var connection = require('./../dbconnection');

module.exports.displayAll = function(req, res) {

	connection.query('SELECT * FROM recommendations', function(error, recommendation,
			fields) {
		if (error) {
			res.send(error);
		} else {
			res.send(recommendation);
		}		
	});
};


 module.exports.displayPerUser = function(req, res) {
 
	 var user_email = req.params.user_email;

	 connection.query('SELECT * FROM recommendations WHERE user_email=?',[user_email], function(error, results) { 
		 if (error) {
			 res.send(error); 
		} else { 
			res.send(results);
			} 
		 }); 
	 };

module.exports.displayTop10 = function(req, res) {

	 connection.query('SELECT * FROM recommendations ORDER BY average_rating DESC LIMIT 10', function(error, results) { 
		 if (error) {
			 res.send(error); 
		} else { 
			res.send(results);
			} 
		 }); 
	 };