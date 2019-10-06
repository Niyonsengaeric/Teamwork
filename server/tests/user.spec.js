/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();

const runUserTests = () => {
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
};
module.exports = runUserTests;
