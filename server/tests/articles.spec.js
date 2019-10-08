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
        .post('/api/v2/articles')
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
        .post('/api/v2/articles')
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
        .post('/api/v2/articles')
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
        .post('/api/v2/articles')
        .set('token', Token)
        .send(newarticle)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          done();
        });
    });
  });
  describe('Edit articles (patch)', () => {
    it('It should return 422 when the articles to be edited has an empty required field  ', (done) => {
      const Signed = mockData.user4;
      const newarticle = {
        title: 'FootBall Life',
      };
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .patch('/api/v2/articles/3')
        .set('token', Token)
        .send(newarticle)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });

    it('It should return 200 if the article succed the update  ', (done) => {
      const Signed = mockData.user4;
      const newarticle = mockData.article2;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .patch('/api/v2/articles/3')
        .set('token', Token)
        .send(newarticle)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('It should return 409 if the article is already updated  ', (done) => {
      const Signed = mockData.user4;
      const newarticle = mockData.article2;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .patch('/api/v2/articles/3')
        .set('token', Token)
        .send(newarticle)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          done();
        });
    });

    it('It should return 404 when the article is not found  ', (done) => {
      const Signed = mockData.user4;
      const newarticle = mockData.article2;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .patch('/api/v2/articles/1')
        .set('token', Token)
        .send(newarticle)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });

  describe('Delete Article (patch)', () => {
    it('It should return 200 when the article is deleted  ', (done) => {
      const Signed = mockData.user4;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .delete('/api/v2/articles/3')
        .set('token', Token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('It should return 404 the article is not found   ', (done) => {
      const Signed = mockData.Adminuser;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .delete('/api/v2/articles/200')
        .set('token', Token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('It should return 200 when the article is deleted  ', (done) => {
      const Signed = mockData.Adminuser;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .delete('/api/v2/articles/2')
        .set('token', Token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });


    it('It should return 404 when the article to delete is not found  ', (done) => {
      const Signed = mockData.user4;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .delete('/api/v2/articles/3')
        .set('token', Token)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
  describe('comment on article (post)', () => {
    it('It should return 422 when the comment has an empty required field  ', (done) => {
      const Signed = mockData.user4;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .post('/api/v2/articles/1/comments')
        .set('token', Token)
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });

    it('It should return 201 when the comment is added to an article  ', (done) => {
      const Signed = mockData.user4;
      const commentArticle = {
        comment: 'interesting !!!',
      };
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .post('/api/v2/articles/1/comments')
        .set('token', Token)
        .send(commentArticle)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });

    it('It should return 404 when a user try to added a comment to a non existing article ', (done) => {
      const Signed = mockData.user4;
      const commentArticle = mockData.comment1;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .post('/api/v2/articles/109/comments')
        .set('token', Token)
        .send(commentArticle)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('It should return 403 if an admin account try to comment on article  ', (done) => {
      const Signed = mockData.Adminuser;
      const commentArticle = mockData.comment1;
      const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
      chai
        .request(app)
        .post('/api/v2/articles/1/comments')
        .set('token', Token)
        .send(commentArticle)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
  });
};
module.exports = runArticlesTests;
