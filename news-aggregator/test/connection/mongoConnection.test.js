const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Before block runs once before all the Unit tests are run
// Before each will run before the run of each test

before((done) => {
  mongoose
    .connect("mongodb://localhost:27017/newsTest", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("connected to Mongo DB");
      done();
    })
    .catch((err) => {
      console.log("failed to connect to DB: ", err);
    });
});

beforeEach((done) => {
    console.log("Running before each unit test");
    mongoose.connection.collections.users.drop(() => {
        done();
    });
});

after((done) => {
    console.log("Disconnecting the MongoDB");
    mongoose.disconnect();
    done();
})

