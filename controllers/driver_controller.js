const Driver = require("../models/driver");

module.exports = {
  greeting(req, res) {
    res.send({ result: "Hello" });
  },
  create(req, res) {
    console.log(req.body);
    console.log("aaaa");
    Driver.create({ email: req.body.email }).then(driver => {
      console.log(driver);
      res.send({ result: "Success" });
    });
  }
};
