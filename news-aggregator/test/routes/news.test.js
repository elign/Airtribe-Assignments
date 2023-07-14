const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const server = require("../../server");
const expect = require("chai").expect;

describe("fetch news by signing up and signing in before each test case", () => {
  // If I've to fetch news then I must Signup & Login

  let jwtToken = "";
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
        //Once we've signed up so now we'll signin
        let signInBody = {
          email: "test@test.com",
          password: "test123",
        };

        chai
          .request(server)
          .post("/login")
          .send(signInBody)
          .end((err, res) => {
            jwtToken = res.body.accessToken;
            done();
          });
      });
  });

  it("signs in, validates the token, puts the preference, and fetches the news based on the preference", (done) => {
    let categoryBody = {
      category: "entertainment",
    };
    chai
      .request(server)
      .put("/preferences")
      .set("authorization", `JWT ${jwtToken}`)
      .send(categoryBody)
      .end((err, res) => {
        expect(res.status).equal(200);

        chai
          .request(server)
          .get("/news")
          .set("authorization", `JWT ${jwtToken}`)
          .end((err, res) => {
            expect(res.status).equal(200);
            expect(res.body.length).equal(20);
            done();
          });
      });
  });

  it("fails because of invalid token while fetching the news", (done) => {
    chai
      .request(server)
      .get("/news")
      .set("authorization", `JWT wrongToken`)
      .end((err, res) => {
        expect(res.status).equal(403);
        console.log(res.body.message);
        // expect(res.body.message).equal("Invalid JWT Token");
        done();
      });
  });

  it("fails because of header not being passed", (done) => {
    done();
  });
});
