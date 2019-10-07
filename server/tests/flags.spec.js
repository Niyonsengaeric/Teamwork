/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../index';
import mockData from './mockData';


chai.use(chaiHttp);
chai.should();

const runFlagsTests = () => {

};
module.exports = runFlagsTests;
