const Product = require('../models/product')

module.exports = {
    showProducts: showProducts,
    seedProducts: seedProducts
}

function showProducts (request, response) {
    //get all products
    Product.find({}, (err, products) => {
        if(err)
            return response.status(404).json({message: 'Products not found.'})
        response.status(200).json(products)
    })

}

// seed database
function seedProducts (request, response) {
    // create products
    const products = [
        { name: 'Apple iPhone 7', description: 'O iPhone 7 tem o melhor desempenho.' },
        { name: 'Google Pixel', description: 'the first phone with the Google Assistant built in.'}
    ]

    // use the Product model to insert/save

    for (product of products) {
        var newProduct = new Product(product)
        newProduct.save()
    }

    // seeded!
    response.json({message: 'Database seeded!'})
}
