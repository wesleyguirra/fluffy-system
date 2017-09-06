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

app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
})

// connect to database
mongoose.connect(process.env.DB_URI)


// set routes
app.use(require('./app/routes'))


app.listen(port)

console.log('product list RESTful API server started on: ' + port)