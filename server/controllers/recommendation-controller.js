var connection = require('./../dbconnection');

module.exports.add = function(req, res) {
	var createRecommendation={
		recommendation_id:null,
		user_email:req.body.user_email,
		recommendation_title:req.body.recommendation_title,
		recommendation_text:req.body.recommendation_text,
		recommendation_location:req.body.recommendation_location,
		recommendation_category:req.body.recommendation_category,
		recommendation_link:req.body.recommendation_link,
		recommendation_pic:req.body.recommendation_pic,
		votes: 0,
		rating_total: 0,
		recommendation_rating: 0,
		average_rating: 0,
		is_approved: 'not reviewed'
	};
	
	req.checkBody('recommendation_title', "Missing title.").notEmpty();
	req.checkBody('recommendation_text', "Missing content.").notEmpty();
	req.checkBody('recommendation_location', "Missing location.").notEmpty();
	req.checkBody('recommendation_category', "Missing category.").notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		console.log('Errors in add recommendation');
		res.status(422).json(errors);
        return;
	} else {
	connection.query('INSERT INTO recommendations SET ?', createRecommendation, function(error, recommendation, fields) {
		if (error) {
			res.send(error);
		} else {
			res.status(200).end();
		}		
	});
	}
};

module.exports.update = function(req, res) {
	var recommendation_id = req.param('recommendation_id');
	var updateRecommendation={
			recommendation_id:recommendation_id,
			user_email:req.body.user_email,
			recommendation_title:req.body.recommendation_title,
			recommendation_text:req.body.recommendation_text,
			recommendation_location:req.body.recommendation_location,
			recommendation_category:req.body.recommendation_category,
			recommendation_link:req.body.recommendation_link,
			recommendation_pic:req.body.recommendation_pic,
			recommendation_rating:req.body.recommendation_rating,
			votes:req.body.votes,
			rating_total:req.body.rating_total,
			average_rating: req.body.average_rating,
			is_approved:req.body.is_approved
		};
	
	req.checkBody('recommendation_title', "Missing title.").notEmpty();
	req.checkBody('recommendation_text', "Missing content.").notEmpty();
	req.checkBody('recommendation_location', "Missing location.").notEmpty();
	req.checkBody('recommendation_category', "Missing category.").notEmpty();

	var errors = req.validationErrors();
	if (errors) {
		console.log('Errors in update recommendation');
		res.status(422).json(errors);
        return;
	} else {
	connection.query('UPDATE recommendations SET ? WHERE recommendation_id = ?', [updateRecommendation, recommendation_id], function(error, recommendation, fields) {
		if (error) {
			res.send(error);
		} else {
			res.status(200).end();
		}		
	});
	}
};

module.exports.delete = function(req, res) {
	var recommendation_id = req.param('recommendation_id');
	
	connection.query('DELETE FROM recommendations WHERE recommendation_id = ?', recommendation_id, function(error, recommendation, fields) {
		if (error) {
			res.send(error);
		} else {
			res.status(200).end();
		}		
	});
};

module.exports.updateRating = function(req, res) {
	var recommendation_id = req.param('recommendation_id');
	var updateRating={
			recommendation_rating:req.body.recommendation_rating,
			votes:req.body.votes,
			rating_total:req.body.rating_total,
			average_rating:req.body.average_rating
		};
	
	connection.query('UPDATE recommendations SET ? WHERE recommendation_id = ?', [updateRating, recommendation_id], function(error, recommendation, fields) {
		if (error) {
			res.send(error);
		} else {
			res.send(fields).status(200).end();
		}		
	});
};