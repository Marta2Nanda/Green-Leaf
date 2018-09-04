var connection = require('./../dbconnection');

module.exports.displayAll = function(req, res) {

	connection.query('SELECT * FROM users', function(error, user,
			fields) {
		if (error) {
			res.send(error);
		} else {
			res.send(user);
		}		
	});
};