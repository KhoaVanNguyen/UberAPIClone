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
route(app)

module.exports = app        
