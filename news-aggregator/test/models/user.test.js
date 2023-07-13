const User = require("../../models/user");
const expect = require("chai").expect;
const sinon = require("sinon");
const bcrypt = require("bcrypt");

// Actually creating the data in MongoDB
describe("creating a document in mongodb", () => {
  it("Creates a new user successfully", (done) => {
    const user = new User({
      fullName: "Test User",
      email: "test@test.com",
      role: "admin",
      password: bcrypt.hashSync("test1234", 8),
    });

    expect(user.isNew).equal(true);
    user
      .save()
      .then((user) => {
        expect(!user.isNew).equal(true);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("Validates the Email", (done) => {
    const user = new User({
      fullName: "Test User",
      email: "test@123@test.com",
      role: "admin",
      password: bcrypt.hashSync("test1234", 8),
    });

    expect(user.isNew).equal(true);
    user
      .save()
      .then((user) => {
        done();
      })
      .catch((err) => {
        console.log(err._message);
        expect(err._message).equal("User validation failed");
        done();
      });
  }).timeout(10000);
});

// Stubbing the MongoDB Data creation

describe("stubbing the tests for creating the documents in MongoDB", () => {
  // we'll stub save in MongoDB
  const user = new User({
    fullName: "Test User",
    email: "test@test.com",
    role: "admin",
    password: bcrypt.hashSync("test1234", 8),
  });

  // this beforeEach will run before each unit test of this describe block
  beforeEach(() => {
    saveStub = sinon.stub(User.prototype, "save");
  });
  // after each block you've to restore the stub
  // you can't restub an already stubbed function
  afterEach(() => {
    saveStub.restore();
  });

  // When the save stub will be called, then it will be resolved with mockUser
  it("should save the user", async () => {
    const mockUser = {
      _id: "123",
      fullName: "Test User",
      email: "test123@gmail.com",
      role: "admin",
    };
    saveStub.resolves(mockUser);

    const result = await user.save();

    expect(result).to.deep.equal(mockUser);
    expect(saveStub.calledOnce).to.be.true;
  });

  it('should handle the error', async () => {
    const mockError = new Error('Database error');
    saveStub.rejects(mockError);

    try {
        await user.save();
    } catch (error) {
        expect(error).to.equal(mockError);
        expect(saveStub.calledOnce).to.be.true;
    }
  })
});
