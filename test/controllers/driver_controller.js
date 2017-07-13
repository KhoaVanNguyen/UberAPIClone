const assert = require("assert");
const app = require("../../app");
const request = require("supertest");
const mongoose = require("mongoose");
const Driver = mongoose.model("driver");

// mongoose.Promise = global.Promise;
describe("Test API in dirver controller ", () => {
  it("POST /api/drivers to create new driver", done => {
    Driver.count().then(count => {
      console.log(count);
      done();
    });

    // Driver.count({}, count => {

    // })

    // Driver.count().then(count => {
    //     console.log('count ' + count)
    //   request(app)
    //     .post("/api/drivers")
    //     .send({ email: "vankhoa0603@gmail.com" })
    //     .end(() => {
    //       Driver.count().then(newCount => {
    //         assert(count + 1 === newCount);
    //         // assert(true)
    //         done();
    //       });
    //     });
    // });
  });
});
