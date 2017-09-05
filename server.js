// load environment variables
require('dotenv').config()

// grab dependencies
const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose')


// connect to database
mongoose.connect(process.env.DB_URI)


// set routes
app.use(require('./app/routes'))


app.listen(port)

console.log('product list RESTful API server started on: ' + port)