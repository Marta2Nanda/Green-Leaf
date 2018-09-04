var chai = require('chai')
, expect = chai.expect
, should = chai.should();
var app = require('../app');
var request = require('supertest');
var chaiHttp = require('chai-http');

chai.use(require('chai-things'));
chai.use(chaiHttp);

const userCredentials = {
		  user_email: 'marta@test.com', 
		  user_name: 'Marta',
		  user_password: 'student123'
		};
const userCredentialsForDuplicate = {
		  user_email: 'marta@ait.ie',
		  user_name: 'Marta',
		  user_password: 'password'
		};

const userCredentialsForMissingEmail = {
		  user_email: '',
		  user_name: 'Marta',
		  user_password: 'password'
		};

const userCredentialsForWrongPassword = {
		  user_email: 'marta@test.ie',
		  user_name: 'Marta',
		  user_password: 'pass'
		};
const userCredentialsForInvalidEmail = {
		  user_email: 'marta',
		  user_name: 'Marta',
		  user_password: 'password'
		};
const userCredentialsForInvalidName = {
		  user_email: 'marta@test.ie',
		  user_name: 'M',
		  user_password: 'password'
		};

describe('Registration', function() {
	var url = 'http://localhost:3000';
	
    it('should return error trying to duplicate user_email while registration', function(done) {
      request(url)
  	.post('/api/register')
  	.send(userCredentialsForDuplicate)
  	.expect(500)
  	.end(function(err, res) {
            if (err) {
              throw err;
            }
            done();
          });
      });
    
    it('correctly registered user', function(done) {
    	this.timeout(60000);
      request(url)
	.post('/api/register')
	.send(userCredentials)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          done();
        });
    });
    
    it('should return error by missing user_email while registration', function(done) {
        request(url)
  	.post('/api/register')
  	.send(userCredentialsForMissingEmail)
  	.end(function(err, res) {
        if (err) {
          throw err;
        }
        res.should.have.status(422);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(2);
        res.body.should.contain.an.item.with.property('value', '');
        done();
      });
  });
    it('should return error by invalid user_email format while registration', function(done) {
        request(url)
  	.post('/api/register')
  	.send(userCredentialsForInvalidEmail)
  	.end(function(err, res) {
        if (err) {
          throw err;
        }
        res.should.have.status(422);
        res.body.should.be.a('array');
        res.body.should.contain.an.item.with.property('msg', 'Enter a valid email address.');
        done();
      });
  });
    
    it('should return error by wrong password length while registration', function(done) {
        request(url)
  	.post('/api/register')
  	.send(userCredentialsForWrongPassword)
  	.end(function(err, res) {
        if (err) {
          throw err;
        }
        res.should.have.status(422);
        res.body.should.be.a('array');
        res.body.should.contain.an.item.with.property('msg', 'Enter a password 6 - 20.');
        res.body.should.contain.an.item.with.property('value', 'pass');
        done();
      });
  });
    it('should return error by invalid user name while registration', function(done) {
        request(url)
  	.post('/api/register')
  	.send(userCredentialsForInvalidName)
  	.end(function(err, res) {
        if (err) {
          throw err;
        }
        res.should.have.status(422);
        res.body.should.be.a('array');
        res.body.should.contain.an.item.with.property('msg', 'Enter a valid name.');
        res.body.should.contain.an.item.with.property('value', 'M');
        done();
      });
  });
});