const express  = require('express')
const route = require('./route/routes')
const bodyParser = require('body-parser')
const mongoose =  require('mongoose')
const app = express()

mongoose.Promise = global.Promise;

if ( process.env.NODE_ENV !== "test" ){
    mongoose.connect('mongodb://localhost/uberclone');
}


app.use(bodyParser.json())

// app.use( (err,req,res,next) => {
//   res.status(400).send({ error: err })
//   next()
// })

route(app)

module.exports = app        
