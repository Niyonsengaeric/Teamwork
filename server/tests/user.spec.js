/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();


// test for new user
describe('Create a user account.(POST) ', () => {
  it('New user, it should return 201', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.user1)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });

  it('should register non already registered user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.user2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });

  it('should not register an already registered user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.user2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        done();
      });
  });

  it('should register register user with empty required fields', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(mockData.user3)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        done();
      });
  });

  it('should return(404) for a wrong resource request', (done) => {
    chai
      .request(app)
      .delete('/api/v1/auth/signup')
      .send(mockData.user2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });
});

// test for loging users

describe('Login User(POST )', () => {
  it('it should return 401 for Invalid user or password', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.loginInvalidUspass)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });

  it('it should return 401 for Invalid user or password', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.loginInvalidUsermail)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });

  it('it should return 200 if the username match with the password', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.loginsuccess)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
  it(' it should return 422 for empty field', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(mockData.loginEmpty)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        done();
      });
  });
});
