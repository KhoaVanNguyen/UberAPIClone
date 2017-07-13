const express  = require('express')
const route = require('./route/routes')
const app = express()

route(app)

module.exports = app