/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../index';
import mockData from './mockData';


chai.use(chaiHttp);
chai.should();

const runFlagsTests = () => {
  describe('Flag an Articles (post)', () => {
    it('It should return 201 when the new article is succesfully created ', (done) => {
      const Signed = mockData.user4;
      const newarticle = mockData.article1;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .post('/api/v2/articles')
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
        .post('/api/v2/articles')
        .set('token', Token)
        .send(newarticle)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });

    it('It should return 403 you are try to flag your own article ', (done) => {
      const Signed = mockData.user4;
      const reason = mockData.flagReason;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .post('/api/v2/articles/4/flag')
        .set('token', Token)
        .send(reason)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });

    it('It should return 201 when the article is succesfully flaged ', (done) => {
      const Signed = mockData.user2;
      const reason = mockData.flagReason;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .post('/api/v2/articles/4/flag')
        .set('token', Token)
        .send(reason)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });

    it('It should return 400 when the request parameter is not an integer ', (done) => {
      const Signed = mockData.user2;
      const reason = mockData.flagReason;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .post('/api/v2/articles/wwe/flag')
        .set('token', Token)
        .send(reason)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('It should return 409 when the article is arleady flagged with the same reason ', (done) => {
      const Signed = mockData.user2;
      const reason = mockData.flagReason;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .post('/api/v2/articles/4/flag')
        .set('token', Token)
        .send(reason)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          done();
        });
    });

    it('It should return 422 when there is an empty required field ', (done) => {
      const Signed = mockData.user2;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .post('/api/v2/articles/1/flag')
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
        .post('/api/v2/articles/1000/flag')
        .set('token', Token)
        .send(reason)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  describe('Flag a Comment (post)', () => {
    it('It should return 201 when the comment is added to an article  ', (done) => {
      const Signed = mockData.guest;
      const commentArticle = {
        comment: 'interesting !!!',
      };
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .post('/api/v2/articles/4/comments')
        .set('token', Token)
        .send(commentArticle)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });


    it('It should return 201 when the comment is succesfully flaged ', (done) => {
      const Signed = mockData.user4;
      const reason = mockData.flagReason2;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .post('/api/v2/comments/4/flag')
        .set('token', Token)
        .send(reason)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });


    it('It should return 400 when the request parameter is not an integer ', (done) => {
      const Signed = mockData.user4;
      const reason = mockData.flagReason2;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .post('/api/v2/comments/wwe/flag')
        .set('token', Token)
        .send(reason)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('It should return 409 when you try to flag the comment with the same raison ', (done) => {
      const Signed = mockData.user4;
      const reason = mockData.flagReason2;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .post('/api/v2/comments/4/flag')
        .set('token', Token)
        .send(reason)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          done();
        });
    });

    it('It should return 403 when the user try to flag his own comment ', (done) => {
      const Signed = mockData.guest;
      const reason = mockData.flagReason;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .post('/api/v2/comments/4/flag')
        .set('token', Token)
        .send(reason)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });

    it('It should return 422 when there is an empty required field ', (done) => {
      const Signed = mockData.user4;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .post('/api/v2/comments/4/flag')
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
        .post('/api/v2/comments/4653/flag')
        .set('token', Token)
        .send(reason)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  describe('Get all flags (post)', () => {
    it('It should return 200 when all article are succesfully Displayed // for admin only', (done) => {
      const Signed = mockData.Adminuser;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .get('/api/v2/flags')
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
        .get('/api/v2/flags')
        .set('token', Token)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
  });
};
module.exports = runFlagsTests;
