/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('Create a new article (post)', () => {
  it('It should return 201 when the new article is succesfully created ', (done) => {
    const Signed = {
      id: 3,
      firstName: 'HAVUGIMANA',
      lastName: 'GUSTAVE',
      email: 'gu@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'ELECTRICAL',
      address: 'NYARUTARAMA',
      isAdmin: false,
    };
    const newarticle = {
      title: 'Bana Bato',
      article: 'Muze tujye gusenga,nimuze  ',
    };
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
    const Signed = {
      id: 3,
      firstName: 'HAVUGIMANA',
      lastName: 'GUSTAVE',
      email: 'gu@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'ELECTRICAL',
      address: 'NYARUTARAMA',
      isAdmin: false,
    };
    const newarticle = {
      title: 'Bana Bato',
      article: '',
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
    const Signed = {
      id: 1,
      firstName: 'NIYONSENGA',
      lastName: 'ERIC',
      email: 'niyeric11@gmail.com',
      password: '$2b$10$lcLHDlw0YPQ1nLDbodynveS/yx6K.SamH6TwzalYEHoijm1W0jouu',
      gender: 'MALE',
      jobRole: 'HOD',
      department: 'IT',
      address: 'KACYIRU',
      isAdmin: true,
    };
    const newarticle = {
      title: 'GOD is Good',
      article: ' the good of god has no limit so you must praise the Lord any time any where',
    };
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
    const Signed = {
      id: 3,
      firstName: 'HAVUGIMANA',
      lastName: 'GUSTAVE',
      email: 'gu@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'ELECTRICAL',
      address: 'NYARUTARAMA',
      isAdmin: false,
    };
    const newarticle = {
      title: 'Bana Bato',
      article: 'Muze tujye gusenga,nimuze  ',
    };
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

describe('Edit articles (patch)', () => {
  it('It should return 422 when the articles to be edited has an empty required field  ', (done) => {
    const Signed = {
      id: 3,
      firstName: 'HAVUGIMANA',
      lastName: 'GUSTAVE',
      email: 'gu@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'ELECTRICAL',
      address: 'NYARUTARAMA',
      isAdmin: false,
    };
    const newarticle = {
      title: 'FootBall Life',
      article: '',
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .patch('/api/v1/articles/3')
      .set('token', Token)
      .send(newarticle)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('It should return 200 if the article succed the update  ', (done) => {
    const Signed = {
      id: 3,
      firstName: 'HAVUGIMANA',
      lastName: 'GUSTAVE',
      email: 'gu@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'ELECTRICAL',
      address: 'NYARUTARAMA',
      isAdmin: false,
    };
    const newarticle = {
      title: 'FootBall Life',
      article: 'FootBall is some thing good for the ones that play it and to the one who like it',
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .patch('/api/v1/articles/3')
      .set('token', Token)
      .send(newarticle)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('It should return 409 if the article is already updated  ', (done) => {
    const Signed = {
      id: 3,
      firstName: 'HAVUGIMANA',
      lastName: 'GUSTAVE',
      email: 'gu@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'ELECTRICAL',
      address: 'NYARUTARAMA',
      isAdmin: false,
    };
    const newarticle = {
      title: 'FootBall Life',
      article: 'FootBall is some thing good for the ones that play it and to the one who like it',
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .patch('/api/v1/articles/3')
      .set('token', Token)
      .send(newarticle)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        done();
      });
  });

  it('It should return 404 the article is not found  ', (done) => {
    const Signed = {
      id: 3,
      firstName: 'HAVUGIMANA',
      lastName: 'GUSTAVE',
      email: 'gu@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'ELECTRICAL',
      address: 'NYARUTARAMA',
      isAdmin: false,
    };
    const newarticle = {
      title: 'FootBall Life',
      article: 'FootBall is some thing good for the ones that play it and to the one who like it',
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .patch('/api/v1/articles/1')
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
    const Signed = {
      id: 3,
      firstName: 'HAVUGIMANA',
      lastName: 'GUSTAVE',
      email: 'gu@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'ELECTRICAL',
      address: 'NYARUTARAMA',
      isAdmin: false,
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .delete('/api/v1/articles/3')
      .set('token', Token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('It should return 404 the article is not found   ', (done) => {
    const Signed = {
      id: 1,
      firstName: 'NIYONSENGA',
      lastName: 'ERIC',
      email: 'niyeric11@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'HOD',
      department: 'IT',
      address: 'KACYIRU',
      isAdmin: true,
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .delete('/api/v1/articles/200')
      .set('token', Token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('It should return 200 when the article is deleted  ', (done) => {
    const Signed = {
      id: 1,
      firstName: 'NIYONSENGA',
      lastName: 'ERIC',
      email: 'niyeric11@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'HOD',
      department: 'IT',
      address: 'KACYIRU',
      isAdmin: true,
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .delete('/api/v1/articles/2')
      .set('token', Token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });


  it('It should return 404 when the article to delete is not found  ', (done) => {
    const Signed = {
      id: 3,
      firstName: 'HAVUGIMANA',
      lastName: 'GUSTAVE',
      email: 'gu@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'ELECTRICAL',
      address: 'NYARUTARAMA',
      isAdmin: false,
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .delete('/api/v1/articles/3')
      .set('token', Token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});
describe('comment on article (post)', () => {
  it('It should return 422 when the comment has an empty required field  ', (done) => {
    const Signed = {
      id: 3,
      firstName: 'HAVUGIMANA',
      lastName: 'GUSTAVE',
      email: 'gu@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'ELECTRICAL',
      address: 'NYARUTARAMA',
      isAdmin: false,
    };
    const commentArticle = {
      comment: '',
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .post('/api/v1/articles/1/comments')
      .set('token', Token)
      .send(commentArticle)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('It should return 201 when the comment is added to an article  ', (done) => {
    const Signed = {
      id: 3,
      firstName: 'HAVUGIMANA',
      lastName: 'GUSTAVE',
      email: 'gu@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'ELECTRICAL',
      address: 'NYARUTARAMA',
      isAdmin: false,
    };
    const commentArticle = {
      comment: 'interesting !!!',
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .post('/api/v1/articles/1/comments')
      .set('token', Token)
      .send(commentArticle)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('It should return 404 when a user try to added a comment to a non existing article ', (done) => {
    const Signed = {
      id: 3,
      firstName: 'HAVUGIMANA',
      lastName: 'GUSTAVE',
      email: 'gu@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'ELECTRICAL',
      address: 'NYARUTARAMA',
      isAdmin: false,
    };
    const commentArticle = {
      comment: 'interesting !!!',
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .post('/api/v1/articles/109/comments')
      .set('token', Token)
      .send(commentArticle)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('It should return 401 if an admin account try to comment on article  ', (done) => {
    const Signed = {
      id: 1,
      firstName: 'NIYONSENGA',
      lastName: 'ERIC',
      email: 'niyeric11@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'HOD',
      department: 'IT',
      address: 'KACYIRU',
      isAdmin: true,
    };
    const commentArticle = {
      comment: 'Stop writting those things',
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .post('/api/v1/articles/1/comments')
      .set('token', Token)
      .send(commentArticle)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
});
describe('Get all Articles (get)', () => {
  it('It should return 200 when all registered articles Displays  ', (done) => {
    const Signed = {
      id: 1,
      firstName: 'NIYONSENGA',
      lastName: 'ERIC',
      email: 'niyeric11@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'HOD',
      department: 'IT',
      address: 'KACYIRU',
      isAdmin: true,
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .get('/api/v1/feeds')
      .set('token', Token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('Display specific article (get)', () => {
  it('It should return 200 when a specific article is Displays  ', (done) => {
    const Signed = {
      id: 1,
      firstName: 'NIYONSENGA',
      lastName: 'ERIC',
      email: 'niyeric11@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'HOD',
      department: 'IT',
      address: 'KACYIRU',
      isAdmin: true,
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .get('/api/v1/articles/1')
      .set('token', Token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('It should return 404 when a specific article is not found  ', (done) => {
    const Signed = {
      id: 3,
      firstName: 'HAVUGIMANA',
      lastName: 'GUSTAVE',
      email: 'gu@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'ELECTRICAL',
      address: 'NYARUTARAMA',
      isAdmin: false,
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .get('/api/v1/articles/1000')
      .set('token', Token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});

describe('filter article (get)', () => {
  it('It should return 200 when a desired word matched  ', (done) => {
    const Signed = {
      id: 3,
      firstName: 'HAVUGIMANA',
      lastName: 'GUSTAVE',
      email: 'gu@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'ELECTRICAL',
      address: 'NYARUTARAMA',
      isAdmin: false,
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .get('/api/v1/articles?articles=mindset')
      .set('token', Token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('It should return 405 if there is no tag entered  ', (done) => {
    const Signed = {
      id: 3,
      firstName: 'HAVUGIMANA',
      lastName: 'GUSTAVE',
      email: 'gu@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'ELECTRICAL',
      address: 'NYARUTARAMA',
      isAdmin: false,
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .get('/api/v1/articles?')
      .set('token', Token)
      .end((err, res) => {
        expect(res.status).to.equal(405);
        done();
      });
  });

  it('It should return 404 when a desired word is not matched  with any article ', (done) => {
    const Signed = {
      id: 3,
      firstName: 'HAVUGIMANA',
      lastName: 'GUSTAVE',
      email: 'gu@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'ELECTRICAL',
      address: 'NYARUTARAMA',
      isAdmin: false,
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .get('/api/v1/articles?articles=makdakdkjd')
      .set('token', Token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('It should return 200 when the article is deleted  ', (done) => {
    const Signed = {
      id: 1,
      firstName: 'NIYONSENGA',
      lastName: 'ERIC',
      email: 'niyeric11@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'HOD',
      department: 'IT',
      address: 'KACYIRU',
      isAdmin: true,
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .delete('/api/v1/articles/1')
      .set('token', Token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('It should return 404 there is no registered articles to be Displayed  ', (done) => {
    const Signed = {
      id: 1,
      firstName: 'NIYONSENGA',
      lastName: 'ERIC',
      email: 'niyeric11@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'HOD',
      department: 'IT',
      address: 'KACYIRU',
      isAdmin: true,
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .get('/api/v1/feeds')
      .set('token', Token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});
