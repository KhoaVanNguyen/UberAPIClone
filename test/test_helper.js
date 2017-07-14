const mongoose = require("mongoose");

before(done => {
  mongoose.connect("mongodb://localhost/uberclone_test");
  console.log('Im here')
  mongoose.connection.once("open", () => done()).on("error", err => {
    console.warn(err);
  });
});

beforeEach(done => {
  const { drivers } = mongoose.connection.collections;

  drivers.drop()
    .then(() => done())
    .catch(() => done());
});
