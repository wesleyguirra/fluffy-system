const express = require('express'),
    router = express.Router(),
    productsController = require('./controllers/products.controller')

module.exports = router

router.get('/products',      productsController.showProducts)

// seed products
router.get('/products/seed', productsController.seedProducts)