const express  = require('express')
const route = require('./route/routes')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
route(app)

module.exports = app