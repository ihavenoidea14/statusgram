var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../bin/www');
var should = chai.should();

chai.use(chaiHttp);

describe('POST Routing', function() {

  describe('POST @ /api/v1/purchase', function() {

    it ('it should not throw an error', function(done) {
      chai.request(server)
        .post('/api/v1/purchase')
        .end(function(err, res) {
          res.should.have.status(200);
          done();
        });
    });

  });

  describe('POST @ /api/v1/refi', function() {

    it ('it should not throw an error', function(done) {
      chai.request(server)
        .post('/api/v1/refi')
        .end(function(err, res) {
          res.should.have.status(200);
          done();
        });
    });

  });

  describe('POST @ /api/v1/listing', function() {

    it ('it should not throw an error', function(done) {
      chai.request(server)
        .post('/api/v1/listing')
        .end(function(err, res) {
          res.should.have.status(200);
          done();
        });
    });

  });

  describe('POST @ /api/v1/selling', function() {

    it ('it should not throw an error', function(done) {
      chai.request(server)
        .post('/api/v1/selling')
        .end(function(err, res) {
          res.should.have.status(200);
          done();
        });
    });

  });

});

describe('GET Routing', function() {

  describe('GET @ /api/v1/download', function() {

    it ('should not throw an error', function(done) {
      chai.request(server)
        .get('/api/v1/download')
        .end(function(err, res) {
          res.should.have.status(200);
          done();
        });
    });

    it ('should send a pdf', function(done) {
      chai.request(server)
        .get('/api/v1/download')
        .end(function(err, res) {
          res.headers['content-type'].should.equal('application/pdf');
          done();
        });
    });

    it ('should contain a valid file', function(done) {
      chai.request(server)
        .get('/api/v1/download')
        .end(function(err, res) {
          res.headers['content-length'].should.be.above(0);
          done();
        });
    });

  })

});