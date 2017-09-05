// load environment variables
require('dotenv').config()

// grab dependencies
const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect to database
mongoose.connect(process.env.DB_URI)


// set routes
app.use(require('./app/routes'))


app.listen(port)

console.log('product list RESTful API server started on: ' + port)