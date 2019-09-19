/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('Flag an Articles (post)', () => {
  it('It should return 201 when the new article is succesfully created ', (done) => {
    const Signed = {
      id: 2,
      firstName: 'BYUSA',
      lastName: 'PRINCE DACY',
      email: 'byusa@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'FINANCE',
      address: 'UMUSAVE',
      isAdmin: false,
    };
    const newarticle = {
      title: 'Identity-based habits',
      article: 'One of the central ideas in the book is the concept of building “identity-based habits”, which essentially recommends focusing on the type of person you wish to become rather than the outcome you wish to achieve. One reader named Roland used the idea to improve his eating habits. “I stopped eating unhealthy food via identity change,” he wrote. “I tried many times in the past, but it became easy — natural — only after I had made the conscious decision that I want to be someone who eats healthy. Instead of aiming for I want to stop eating bad food, I tried changing the mindset to I am someone that eats healthy and lives a healthy life. It changes how you approach things.',
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

  it('It should return 201 when the new article is succesfully created ', (done) => {
    const Signed = {
      id: 3,
      firstName: 'SARPONG',
      lastName: 'BENITH',
      email: 'sarpong@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'FINANCE',
      address: 'UMUSAVE',
      isAdmin: false,
    };
    const newarticle = {
      title: 'Growth Mindset',
      article: " I can’t do it, I can’t learn this, it's too hard, Come on, I’m just a Junior Developer, WebPack is not my thing, I tried it and failed.Those are the words of a developer drenched and soaked with imposter syndrome.Over time we keep fighting ourselves, trying to run away from our shadows, trying to find shortcuts, yes I did also, I really did: (At a point in my life, I just felt some things were not meant for me, I felt maths was too complex for me, JavaScript was not my thing!!",
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

  it('It should return 201 when the article is succesfully flaged ', (done) => {
    const Signed = {
      id: 3,
      firstName: 'SARPONG',
      lastName: 'BENITH',
      email: 'sarpong@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'FINANCE',
      address: 'UMUSAVE',
      isAdmin: false,
    };
    const flagReason = {
      reason: 'this article is against human rights',
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .post('/api/v1/articles/flag/1')
      .set('token', Token)
      .send(flagReason)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('It should return 422 when there is an empty required field ', (done) => {
    const Signed = {
      id: 3,
      firstName: 'SARPONG',
      lastName: 'BENITH',
      email: 'sarpong@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'FINANCE',
      address: 'UMUSAVE',
      isAdmin: false,
    };
    const flagReason = {
      reason: '',
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .post('/api/v1/articles/flag/1')
      .set('token', Token)
      .send(flagReason)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        done();
      });
  });

  it('It should return 404 when the flagged article is not exist ', (done) => {
    const Signed = {
      id: 3,
      firstName: 'SARPONG',
      lastName: 'BENITH',
      email: 'sarpong@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'FINANCE',
      address: 'UMUSAVE',
      isAdmin: false,
    };
    const flagReason = {
      reason: 'this article is against human rights',
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .post('/api/v1/articles/flag/1000')
      .set('token', Token)
      .send(flagReason)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});

describe('Flag a Comment (post)', () => {
  it('It should return 201 when the comment is succesfully flaged ', (done) => {
    const Signed = {
      id: 3,
      firstName: 'SARPONG',
      lastName: 'BENITH',
      email: 'sarpong@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'FINANCE',
      address: 'UMUSAVE',
      isAdmin: false,
    };
    const flagReason = {
      reason: 'Abusing Comment',
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .post('/api/v1/comments/flag/1')
      .set('token', Token)
      .send(flagReason)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('It should return 422 when there is an empty required field ', (done) => {
    const Signed = {
      id: 3,
      firstName: 'SARPONG',
      lastName: 'BENITH',
      email: 'sarpong@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'FINANCE',
      address: 'UMUSAVE',
      isAdmin: false,
    };
    const flagReason = {
      reason: '',
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .post('/api/v1/comments/flag/1')
      .set('token', Token)
      .send(flagReason)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        done();
      });
  });


  it('It should return 404 when the flagged comment does not exist ', (done) => {
    const Signed = {
      id: 3,
      firstName: 'SARPONG',
      lastName: 'BENITH',
      email: 'sarpong@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'FINANCE',
      address: 'UMUSAVE',
      isAdmin: false,
    };
    const flagReason = {
      reason: 'this comment is against human rights',
    };
    const Token = jwt.sign(Signed, process.env.JWT, { expiresIn: '24h' });
    chai
      .request(app)
      .post('/api/v1/comments/flag/4653')
      .set('token', Token)
      .send(flagReason)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});

describe('get Articles (post)', () => {
  it('It should return 200 when all article are succesfully Displayed // for admin only', (done) => {
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
    const Signed = {
      id: 3,
      firstName: 'SARPONG',
      lastName: 'BENITH',
      email: 'sarpong@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'FINANCE',
      address: 'UMUSAVE',
      isAdmin: false,
    };
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
  it('It should return 200 when flagged comment is deleted', (done) => {
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
      .delete('/api/v1/comments/2')
      .set('token', Token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('It should return 404 when flagged comment is not found', (done) => {
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
      .delete('/api/v1/comments/29345')
      .set('token', Token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('It should return 403 when normal user is trying to delete a comment', (done) => {
    const Signed = {
      id: 3,
      firstName: 'SARPONG',
      lastName: 'BENITH',
      email: 'sarpong@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'FINANCE',
      address: 'UMUSAVE',
      isAdmin: false,
    };
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
    const Token = 'yese umuntu imbwa';
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
