const mongoose = require("mongoose");
//To run all tests after the db connection has done
before(function (done) {
  mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  );
  mongoose.connection.once("open", function () {
    console.log("database connected");
  });
  done();
});
//Drop every result before EVERY single test
beforeEach(function (done) {
  mongoose.connection.collections.mariochars.drop(function () {
    done();
  });
});
