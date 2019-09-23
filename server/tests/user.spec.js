/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();


// test for new user
describe('Create a user account.(POST) ', () => {
  it('New user, it should return 201', (done) => {
    const user = {
      firstName: 'HAVUGIMANA',
      lastName: 'GUSTAVE',
      email: 'gu@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'ELECTRICAL',
      address: 'NYARUTARAMA',

    };

    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });

  it('should register non already registered user', (done) => {
    const user = {
      firstName: 'NSABIMANA',
      lastName: 'THIERY',
      email: 'tirere@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'IT',
      address: 'KACYIRU',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });

  it('should not register an already registered user', (done) => {
    const user = {
      firstName: 'NSABIMANA',
      lastName: 'THIERY',
      email: 'tirere@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'IT',
      address: 'KACYIRU',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        done();
      });
  });

  it('should register non already registered user', (done) => {
    const user = {
      firstName: 'CONFIANCE',
      lastName: 'ELYSE',
      email: '',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'ELECTRICAL',
      address: 'KABEZA',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        done();
      });
  });

  it('should return(404) for a wrong resource request', (done) => {
    const user = {
      firstName: 'CONFIANCE',
      lastName: 'ELYSE',
      email: 'confiance@gmail.com',
      password: '12345six',
      gender: 'MALE',
      jobRole: 'Employee',
      department: 'ELECTRICAL',
      address: 'KABEZA',
    };

    chai
      .request(app)
      .delete('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });
});

// test for loging users

describe('Login User(POST )', () => {
  it('it should return 401 for Invalid user or password', (done) => {
    const user = {
      email: 'gu@gmail.com',
      password: '12345678six',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });

  it('it should return 401 for Invalid user or password', (done) => {
    const user = {
      email: 'gu8@gmail.com',
      password: '12345six',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });

  it('it should return 200 if the username match with the password', (done) => {
    const user = {
      email: 'gu@gmail.com',
      password: '12345six',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
  it(' it should return 422 for empty field', (done) => {
    const user = {
      email: 'gu@gmail.com',
      password: '',
    };

    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        done();
      });
  });
});
