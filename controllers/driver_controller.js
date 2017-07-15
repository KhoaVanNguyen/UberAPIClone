const Driver = require("../models/driver");

module.exports = {
  greeting(req, res) {
    res.send({ result: "Hello" });
  },
   index(req, res, next) {
    const { lng, lat } = req.query;

    Driver.geoNear(
      { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
      { spherical: true, maxDistance: 200000 }
    )
      .then(drivers => res.send(drivers))
      .catch(next);
  },
  create(req, res, next) {
    console.log(req.body);
    Driver.create({ email: req.body.email }).then(driver => {
      console.log(driver);
      res.send({ result: "Success" });
    })
    .catch(next);
  },
  edit(req,res,next){
    const driverId = req.params.id
    const driverProps = req.body

    console.log('driverId = ' + req.params.id )
    console.log('driverProps = ' + req.body )
    console.log(req.body)
    Driver.findByIdAndUpdate(driverId,driverProps).then(driver => {
      res.send({ driver: driver })
    }).catch(next)

  },
  delete(req,res,next){
    const driverId = req.params.id

    Driver.findByIdAndRemove(driverId).then(driver => {
      res.status(204).send({driver})
    })
    .catch(next)
  }
};
