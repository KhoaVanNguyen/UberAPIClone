const assert = require("assert");
const app = require("../../app");
const request = require("supertest");
const mongoose = require("mongoose");
const Driver = mongoose.model("driver");

describe("Test API in dirver controller ", () => {
  it("POST /api/drivers to create new driver", done => {
    Driver.count().then(count => {
      console.log("count " + count);
      request(app)
        .post("/api/drivers")
        .send({ email: "vankhoa0603@gmail.com" })
        .end(() => {
          Driver.count().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  it("PUT /api/drivers/id to update a driver", done => {
    const driver = new Driver({ email: "a@gmail.com", available: false });
    driver.save().then(driver => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ available: true })
        .end(() => {
          Driver.findOne({ email: "a@gmail.com" }).then(driver => {
            assert(driver.available === true);
            done();
          });
        });
    });
  });

  it('DELETE /api/drivers/id to delete a driver', done => {
     const driver = new Driver({ email: "a@gmail.com", available: false });

     driver.save().then(driver => {

      request(app).delete(`/api/drivers/${driver._id}`)
      .end( () => {
        Driver.count().then(count => {
          assert(count === 0)
          done()
        })
      }  )


     })
  })

  // it('GET /api/drivers/index to query nearest driver ', done => {

  //   const seatleDriver = new Driver({
  //     email: 'user3@gmail.com',
  //     geometry: { type: 'Point', coordinates: [-112.4759902,47.61147628]  }
  //   })

  //   const miamiDriver = new Driver({
  //     email: 'user4@gmail.com',
  //     geometry: { type: 'Point', coordinates: [-80.253,25.791]  }
  //   })

  //   Promise.all([seatleDriver.save(), miamiDriver.save()])
  //     .then( () => {
  //       request(app)
  //         .get('/api/drivers?lng=-80&lat=25')
  //         .end( (err,response) => {
  //             console.log(response.body)
  //             done()
  //         } )  
  //     }    ) 


  // })
  it('Get to /api/drivers finds drivers in a location', done => {
    const seattleDriver = new Driver({
      email: 'seattle@test.com',
      geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
    });
    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: { type: 'Point', coordinates: [-80.2534507, 25.791581] }
    });

    Promise.all([seattleDriver.save(), miamiDriver.save()])
      .then(() => {
        request(app)
          .get('/api/drivers?lng=-80&lat=25')
          .end((err, response) => {
            console.log(response)
            // assert(response.body.length === 1);
            // assert(response.body[0].obj.email === 'seattle@test.com');
            done();
          });
      });
  })

});
