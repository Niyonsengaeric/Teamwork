/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../index';
import mockData from './mockData';

chai.use(chaiHttp);
chai.should();

const runArticlesTests = () => {
  describe('Create a new article (post)', () => {
    it('It should return 201 when the new article is succesfully created ', (done) => {
      const Signed = mockData.user4;
      const newarticle = mockData.article1;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('token', Token)
        .send(newarticle)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });

    it('It should return 422 when the new article has an empty required field ', (done) => {
      const Signed = mockData.user4;
      const newarticle = {
        title: 'Bana Bato',
      };
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('token', Token)
        .send(newarticle)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });

    it('It should return 403 when Admin account try to create a new article  ', (done) => {
      const Signed = mockData.Adminuser;
      const newarticle = mockData.article1;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('token', Token)
        .send(newarticle)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });

    it('It should return 409 when the user try to Create similar Articles ', (done) => {
      const Signed = mockData.user4;
      const newarticle = mockData.article1;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('token', Token)
        .send(newarticle)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          done();
        });
    });
  });
};
module.exports = runArticlesTests;
