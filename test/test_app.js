const assert = require("assert");
const request = require("supertest");
const app = require("../app");

describe("Test API ", () => {
  it("test api/get", done => {

        request(app)
            .get('/api')
            .end( (err,res) => {
                assert(res.body.result === 'Hello'  )
                done()
            } )

  });
});
