var chai = require('chai')
, expect = chai.expect
, should = chai.should();
var app = require('../app');
var request = require('supertest');
var chaiHttp = require('chai-http');

chai.use(require('chai-things'));
chai.use(chaiHttp);

describe('Display recommendation', function() {
	var url = 'http://localhost:3000';
    
    it('display all recommendation from db', function(done) {
      request(url)
	.get('/api/recommendations/display')
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(11);
          done();
        });
    });
    
    it('display recommendation for specific user from db', function(done) {
        request(url)
  	.get('/api/recommendations/display/anna@ait.ie')
  	.end(function(err, res) {
        if (err) {
          throw err;
        }
        res.should.have.status(200);
       res.body.should.be.a('array');
       res.body.length.should.be.eql(5);
       res.body.should.contain.an.item.with.property('user_email', 'anna@ait.ie');
        done();
      });
  });
    
    it('display top 10 recommendation', function(done) {
        request(url)
  	.get('/api/recommendations/displayTop10')
  	.end(function(err, res) {
        if (err) {
          throw err;
        }
        res.should.have.status(200);
       res.body.should.be.a('array');
       res.body.length.should.be.eql(10);
        done();
      });
  });
});