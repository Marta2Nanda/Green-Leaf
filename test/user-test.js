var chai = require('chai')
, expect = chai.expect
, should = chai.should();
var app = require('../app');
var request = require('supertest');
var chaiHttp = require('chai-http');

chai.use(require('chai-things'));
chai.use(chaiHttp);

const correctAddAdminDetails = {
		user_email: 'nina@ait.ie',
		user_name: 'Nina'
		};
const missingUserEmailAddAdmin = {
		user_email: '',
		user_name: 'Nina'
		};
const missingUserNameAddAdmin = {
		user_email: 'nina@ait.ie',
		user_name: ''
		};
const duplicateEmailAddAdmin = {
		user_email: 'marta@ait.ie',
		user_name: 'Marta'
		};
const EmailInWrongFormatAddAdmin = {
		user_email: 'nina',
		user_name: 'Nina'
		};
const user_email = 'minka@ait.ie';

describe('Users', function() {
	var url = 'http://localhost:3000';
	
    it('should add admin successfully', function(done) {
    this.timeout(60000);
      request(url)
  	.post('/api/users/add')
  	.send(correctAddAdminDetails)
  	.expect(200)
  	.end(function(err, res) {
            if (err) {
              throw err;
            }
            done();
          });
      });
    
    it('should fail add recommendation due to missing user email', function(done) {
      request(url)
	.post('/api/users/add')
	.send(missingUserEmailAddAdmin)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(422);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
          res.body.should.contain.an.item.with.property('msg', 'Enter valid email address.');
          res.body.should.contain.an.item.with.property('param', 'user_email');
          done();
        });
    });
    
    it('should fail add recommendation due to missing user name', function(done) {
        request(url)
  	.post('/api/users/add')
  	.send(missingUserNameAddAdmin)
  	.end(function(err, res) {
            if (err) {
              throw err;
            }
            res.should.have.status(422);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            res.body.should.contain.an.item.with.property('msg', 'Missing name.');
            res.body.should.contain.an.item.with.property('param', 'user_name');
            done();
          });
      });
    
    it('should fail add recommendation due to duplicate user email', function(done) {
        request(url)
  	.post('/api/users/add')
  	.send(duplicateEmailAddAdmin)
  	.end(function(err, res) {
            if (err) {
              throw err;
            }
            res.should.have.status(500);
            done();
          });
      });
    
    it('should fail add recommendation due to wrong user email format', function(done) {
        request(url)
  	.post('/api/users/add')
  	.send(EmailInWrongFormatAddAdmin)
  	.end(function(err, res) {
            if (err) {
              throw err;
            }
            res.should.have.status(422);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            res.body.should.contain.an.item.with.property('msg', 'Enter valid email address.');
            res.body.should.contain.an.item.with.property('param', 'user_email');
            done();
          });
      });
        
        it('should delete user successfully', function(done) {
            request(url)
      	.delete('/api/users/delete/'+user_email)
      	.expect(200)
      	.end(function(err, res) {
                if (err) {
                  throw err;
                }
                done();
              });
          });
});