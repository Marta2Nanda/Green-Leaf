var chai = require('chai')
, expect = chai.expect
, should = chai.should();
var app = require('../app');
var request = require('supertest');
var chaiHttp = require('chai-http');

chai.use(require('chai-things'));
chai.use(chaiHttp);

const userCredentials = {
		  user_email_login: 'anna@ait.ie', 
		  user_password_login: 'password'
		};
const userCredentialsNotMatch = {
		  user_email_login: 'anna@ait.ie', 
		  user_password_login: 'password123'
		};
const userEmailNotExists= {
		  user_email_login: 'test@test.ie', 
		  user_password_login: 'password'
		};

describe('Login', function() {
	var url = 'http://localhost:3000';
    
    it('correctly logged in user', function(done) {
      request(url)
	.post('/api/login')
	.send(userCredentials)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          res.body.should.include.something.that.deep.equals({ user_email: 'anna@ait.ie', user_name: 'Anna', user_password: '148fc783367e6a74', user_type: 'user' });
          done();
        });
    });
    
    it('should return error by not matching credentials while login', function(done) {
        request(url)
  	.post('/api/login')
  	.send(userCredentialsNotMatch)
  	.expect(422)
  	.end(function(err, res) {
        if (err) {
          throw err;
        }
        done();
      });
  });
    
    it('should return error when login email doesn \'t exists', function(done) {
        request(url)
  	.post('/api/login')
  	.send(userEmailNotExists)
  	.expect(422)
  	.end(function(err, res) {
        if (err) {
          throw err;
        }
        done();
      });
  });
});