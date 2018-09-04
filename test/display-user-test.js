var chai = require('chai')
, expect = chai.expect
, should = chai.should();
var app = require('../app');
var request = require('supertest');
var chaiHttp = require('chai-http');

chai.use(require('chai-things'));
chai.use(chaiHttp);

describe('Display users', function() {
	var url = 'http://localhost:3000';
    
    it('display all recommendation from db', function(done) {
      request(url)
	.get('/api/users/display')
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(3);
          done();
        });
    });
});