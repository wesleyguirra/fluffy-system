const mongoose = require('mongoose'),
    Schema = mongoose.Schema

// create a schema
const productSchema = new Schema({
    name: String,
    slug: {
        type: String,
        unique: true
    },
    description: String
})

// middleware -------
// make sure that the slug is create from the name
productSchema.pre('save', function(next){
    this.slug = slugify(this.name)
    next()
})

// create the model
const productModel = mongoose.model('Product', productSchema)

// export the model
module.exports = productModel

// function to slugify a name
function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}