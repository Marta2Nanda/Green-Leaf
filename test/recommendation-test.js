var chai = require('chai')
, expect = chai.expect
, should = chai.should();
var app = require('../app');
var request = require('supertest');
var chaiHttp = require('chai-http');

chai.use(require('chai-things'));
chai.use(chaiHttp);

const correctRecommendationDetails = {
		user_email: 'minka@ait.ie',
		recommendation_title: 'test title',
		recommendation_text: 'test content',
		recommendation_location: 'test location',
		recommendation_category: 'test category',
		recommendation_link: 'test link',
		recommendation_pic: 'test pic'
		};
const missingTitleRecommendationDetails = {
		user_email: 'minka@ait.ie',
		recommendation_title: '',
		recommendation_text: 'test content',
		recommendation_location: 'test location',
		recommendation_category: 'test category',
		recommendation_link: 'test link',
		recommendation_pic: 'test pic'
		};
const missingTextRecommendationDetails = {
		user_email: 'minka@ait.ie',
		recommendation_title: 'test title',
		recommendation_text: '',
		recommendation_location: 'test location',
		recommendation_category: 'test category',
		recommendation_link: 'test link',
		recommendation_pic: 'test pic'
		};
const missingLocationRecommendationDetails = {
		user_email: 'minka@ait.ie',
		recommendation_title: 'test title',
		recommendation_text: 'test content',
		recommendation_location: '',
		recommendation_category: 'test category',
		recommendation_link: 'test link',
		recommendation_pic: 'test pic'
		};
const missingCategoryRecommendationDetails = {
		user_email: 'minka@ait.ie',
		recommendation_title: 'test title',
		recommendation_text: 'test content',
		recommendation_location: 'test location',
		recommendation_category: '',
		recommendation_link: 'test link',
		recommendation_pic: 'test pic'
		};
const recommendationId = 3;
const recommendationRatingUpdate = {
		recommendation_rating: 5,
		votes: 5,
		rating_total: 5,
		average_rating: 5.0
};
const approveRecommendation = {
		user_email: 'minka@ait.ie',
		recommendation_title: 'test title',
		recommendation_text: 'test content',
		recommendation_location: 'test location',
		recommendation_category: 'test category',
		recommendation_link: 'test link',
		recommendation_pic: 'test pic',
		recommendation_rating: 3,
		votes: 1,
		rating_total:3,
		average_rating: 3.00,
		is_approved:'reviewed'
		};

describe('Recommendation', function() {
	var url = 'http://localhost:3000';
	
    it('should add recommendation successfully', function(done) {
    this.timeout(60000);
      request(url)
  	.post('/api/recommendations/add')
  	.send(correctRecommendationDetails)
  	.expect(200)
  	.end(function(err, res) {
            if (err) {
              throw err;
            }
            done();
          });
      });
    
    it('should fail add recommendation due to missing title', function(done) {
      request(url)
	.post('/api/recommendations/add')
	.send(missingTitleRecommendationDetails)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(422);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          res.body.should.contain.an.item.with.property('msg', 'Missing title.');
          res.body.should.contain.an.item.with.property('param', 'recommendation_title');
          done();
        });
    });
    
    it('should fail add recommendation due to missing text', function(done) {
        request(url)
  	.post('/api/recommendations/add')
  	.send(missingTextRecommendationDetails)
  	.end(function(err, res) {
            if (err) {
              throw err;
            }
            res.should.have.status(422);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            res.body.should.contain.an.item.with.property('msg', 'Missing content.');
            res.body.should.contain.an.item.with.property('param', 'recommendation_text');
            done();
          });
      });
    
    it('should fail add recommendation due to missing location', function(done) {
        request(url)
  	.post('/api/recommendations/add')
  	.send(missingLocationRecommendationDetails)
  	.end(function(err, res) {
            if (err) {
              throw err;
            }
            res.should.have.status(422);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            res.body.should.contain.an.item.with.property('msg', 'Missing location.');
            res.body.should.contain.an.item.with.property('param', 'recommendation_location');
            done();
          });
      });
    
    it('should fail add recommendation due to missing category', function(done) {
        request(url)
  	.post('/api/recommendations/add')
  	.send(missingCategoryRecommendationDetails)
  	.end(function(err, res) {
            if (err) {
              throw err;
            }
            res.should.have.status(422);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            res.body.should.contain.an.item.with.property('msg', 'Missing category.');
            res.body.should.contain.an.item.with.property('param', 'recommendation_category');
            done();
          });
      });

    it('should update recommendation successfully', function(done) {
        this.timeout(60000);
          request(url)
      	.put('/api/recommendations/update/'+recommendationId)
      	.send(correctRecommendationDetails)
      	.expect(200)
      	.end(function(err, res) {
                if (err) {
                  throw err;
                }
                done();
              });
          });
        
      it('should fail update recommendation due to missing title', function(done) {
          request(url)
    	.put('/api/recommendations/update/'+recommendationId)
    	.send(missingTitleRecommendationDetails)
    	.end(function(err, res) {
              if (err) {
                throw err;
              }
              res.should.have.status(422);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(1);
              res.body.should.contain.an.item.with.property('msg', 'Missing title.');
              res.body.should.contain.an.item.with.property('param', 'recommendation_title');
              done();
            });
        });
        
        it('should fail update recommendation due to missing text', function(done) {
            request(url)
      	.put('/api/recommendations/update/'+recommendationId)
      	.send(missingTextRecommendationDetails)
      	.end(function(err, res) {
                if (err) {
                  throw err;
                }
                res.should.have.status(422);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                res.body.should.contain.an.item.with.property('msg', 'Missing content.');
                res.body.should.contain.an.item.with.property('param', 'recommendation_text');
                done();
              });
          });
        
        it('should fail update recommendation due to missing location', function(done) {
            request(url)
      	.put('/api/recommendations/update/'+recommendationId)
      	.send(missingLocationRecommendationDetails)
      	.end(function(err, res) {
                if (err) {
                  throw err;
                }
                res.should.have.status(422);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                res.body.should.contain.an.item.with.property('msg', 'Missing location.');
                res.body.should.contain.an.item.with.property('param', 'recommendation_location');
                done();
              });
          });
        
        it('should fail update recommendation due to missing category', function(done) {
            request(url)
      	.put('/api/recommendations/update/'+recommendationId)
      	.send(missingCategoryRecommendationDetails)
      	.end(function(err, res) {
                if (err) {
                  throw err;
                }
                res.should.have.status(422);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                res.body.should.contain.an.item.with.property('msg', 'Missing category.');
                res.body.should.contain.an.item.with.property('param', 'recommendation_category');
                done();
              });
          });
        
        it('should update rating of recommendation successfully', function(done) {
            request(url)
      	.put('/api/recommendations/updateRating/'+recommendationId)
      	.send(recommendationRatingUpdate)
      	.expect(200)
      	.end(function(err, res) {
                if (err) {
                  throw err;
                }
                done();
              });
          });
        
        it('should update status of recommendation successfully', function(done) {
            request(url)
      	.put('/api/recommendations/update/'+recommendationId)
      	.send(approveRecommendation)
      	.expect(200)
      	.end(function(err, res) {
                if (err) {
                  throw err;
                }
                done();
              });
          });
        
        it('should delete recommendation successfully', function(done) {
            request(url)
      	.delete('/api/recommendations/delete/'+recommendationId)
      	.expect(200)
      	.end(function(err, res) {
                if (err) {
                  throw err;
                }
                done();
              });
          });
});