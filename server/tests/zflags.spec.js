/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../index';
import mockData from './mockData';


chai.use(chaiHttp);
chai.should();

describe('Flag an Articles (post)', () => {
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

  it('It should return 201 when the new article is succesfully created ', (done) => {
    const Signed = mockData.user4;
    const newarticle = mockData.article2;
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

  it('It should return 201 when the article is succesfully flaged ', (done) => {
    const Signed = mockData.user2;
    const reason = mockData.flagReason;
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .post('/api/v1/articles/flag/1')
      .set('token', Token)
      .send(reason)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('It should return 422 when there is an empty required field ', (done) => {
    const Signed = mockData.user2;
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .post('/api/v1/articles/flag/1')
      .set('token', Token)
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('It should return 404 when the flagged article is not exist ', (done) => {
    const Signed = mockData.user2;
    const reason = mockData.flagReason;
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .post('/api/v1/articles/flag/1000')
      .set('token', Token)
      .send(reason)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});

describe('Flag a Comment (post)', () => {
  it('It should return 201 when the comment is succesfully flaged ', (done) => {
    const Signed = mockData.user2;
    const reason = mockData.flagReason2;
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .post('/api/v1/comments/flag/1')
      .set('token', Token)
      .send(reason)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('It should return 422 when there is an empty required field ', (done) => {
    const Signed = mockData.user2;
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .post('/api/v1/comments/flag/1')
      .set('token', Token)
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(422);
        done();
      });
  });


  it('It should return 404 when the flagged comment does not exist ', (done) => {
    const Signed = mockData.user2;
    const reason = mockData.flagReason;
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .post('/api/v1/comments/flag/4653')
      .set('token', Token)
      .send(reason)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});

describe('get Articles (post)', () => {
  it('It should return 200 when all article are succesfully Displayed // for admin only', (done) => {
    const Signed = mockData.Adminuser;
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .get('/api/v1/flags')
      .set('token', Token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('It should return 403 when a normal user try to view flags', (done) => {
    const Signed = mockData.user4;
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .get('/api/v1/flags')
      .set('token', Token)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });
});

describe('get Articles (post)', () => {
  it('It should return 200 when a flagged comment is deleted', (done) => {
    const Signed = mockData.Adminuser;
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .delete('/api/v1/comments/2')
      .set('token', Token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('It should return 404 when flagged comment is not found', (done) => {
    const Signed = mockData.Adminuser;
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .delete('/api/v1/comments/29345')
      .set('token', Token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('It should return 403 when normal user is trying to delete a comment', (done) => {
    const Signed = mockData.user4;
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .delete('/api/v1/comments/2')
      .set('token', Token)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
  });

  it('It should return 401 for when no token provided', (done) => {
    chai
      .request(app)
      .delete('/api/v1/comments/2')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('It should return 401 for invalid token', (done) => {
    const Token = 'token';
    chai
      .request(app)
      .delete('/api/v1/comments/2')
      .set('token', Token)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
});
