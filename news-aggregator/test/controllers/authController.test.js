process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const bcrypt = require("bcrypt");
const sinon = require("sinon");
const expect = require("chai").expect;
const server = require("../../server");

chai.use(chaiHttp);

describe("verifies the Signup flow with the actual calls to MongoDB", () => {
  let signUpBody = {
    fullName: "Test Name",
    email: "test@test.com",
    role: "admin",
    password: "test123",
  };

  it("Successful signup", (done) => {
    chai
      .request(server)
      .post("/register")
      .send(signUpBody)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.message).equal("User registered successfully");
        done();
      });
  });

  it("verifies signup flow failing because of email validation", (done) => {
    signUpBody.email = "test@123@gmail.com";
    chai
      .request(server)
      .post("/register")
      .send(signUpBody)
      .end((err, res) => {
        expect(res.status).equal(500);
        expect(res.body.message._message).equal("User validation failed");
        done();
      });
  });

  it("verifies the signup flow failing because of invalid role", (done) => {
    signUpBody.email = "test@gmail.com";
    signUpBody.role = "test role";
    chai
      .request(server)
      .post("/register")
      .send(signUpBody)
      .end((err, res) => {
        expect(res.status).equal(500);
        expect(res.body.message._message).equal("User validation failed");
        done();
      });
  });

  it("verifies the signup flow failing because of incomplete properties", (done) => {
    signUpBody.role = "admin";
    delete signUpBody.fullName;
    chai
      .request(server)
      .post("/register")
      .send(signUpBody)
      .end((err, res) => {
        expect(res.status).equal(500);
        expect(res.body.message._message).equal("User validation failed");
        done();
      });
  });
});

// For sign in, validation is that user should be registered

describe("Verifies the signin flow with actual mongo db calls", () => {
  beforeEach((done) => {
    let signUpBody = {
      fullName: "Test Name",
      email: "test@test.com",
      role: "admin",
      password: "test123",
    };

    chai
      .request(server)
      .post("/register")
      .send(signUpBody)
      .end((err, res) => {
        //Sign Up flow has already been tested, so no need to test it again.
        done();
      });
  });

  it("Successful signin", (done) => {
    // Suc. Signin means jwt token is generated or not
    let signInBody = {
      email: "test@test.com",
      password: "test123",
    };
    // We can't validate a JWT Token
    chai
      .request(server)
      .post("/login")
      .send(signInBody)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body).to.have.property("accessToken");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("user");
        expect(res.body.message).equal("Login Successful");
        expect(res.body.user.email).equal('test@test.com')
        done();
    });
  });

  it("Signin fails because of password being incorrect", (done) => {
    let signInBody = {
        email: "test@test.com",
        password: "wrongPassword",
        };

      chai
      .request(server)
      .post("/login")
      .send(signInBody)
      .end((err, res) => {
        expect(res.status).equal(401);
        expect(res.body.message).equal("Invalid Password");
        expect(res.body.accessToken).to.be.null;
        done();
    });
  });

  it("User does not exist and sign in fails", (done) => {

    let signInBody = {
        email: "test@wrongEmail.com",
        password: "test123",
        };

      chai
      .request(server)
      .post("/login")
      .send(signInBody)
      .end((err, res) => {
        expect(res.status).equal(404);
        expect(res.body.message).equal("User not found");
        expect(res.body.accessToken).to.be.null;
        done();
    });
  });
});
