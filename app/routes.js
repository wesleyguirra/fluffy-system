const express = require('express'),
    router = express.Router(),
    productController = require('./controllers/products.controller'),
    userController = require('./controllers/users.controller'),
    jwt = require('./controllers/jwt.controller')

module.exports = router

// login endpoint
router.route('/auth')
    .post(userController.loginUser)

// list products
router.route('/products')
    .get(jwt.validateToken, productController.showProducts)

// user routes
router.route('/users')
    .get(jwt.validateToken, userController.showUsers)
    .post(userController.createUser)


// seed database
router.route('/products/seed')
    .get(productController.seedProducts)
router.route('/users/seed')
    .get(userController.seedUsers)
