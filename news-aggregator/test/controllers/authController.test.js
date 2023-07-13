process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcrypt');
const sinon = require('sinon');
const expect = require('chai').expect;

chai.use(chaiHttp);

describe('verifies the Signup flow with he actual calls to MongoDB', () => {

    let signUpBody = {
        fullName : "Test Name",
        email : 'test@test.com',
        role : 'admin',
        password : 'test123'
    };

    it('Successful signup', (done) => {

    });

    it('verifies signup flow failing because of email validation', (done) => {

    });

    it('verifies the signup flow failing because of valid role', (done) => {

    });

    it('verifies the signup flow failing because of incomplete properties', (done) => {

    });


});