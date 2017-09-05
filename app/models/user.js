const mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema

// create a schema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// middleware to encrypt password
userSchema.pre('save', function(next) {
    var user = this
    if (!user.isModified('password')) return next()
    bcrypt.genSalt(5, function(err, salt) {
        if (err) return next(err)
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})

// verify pass
userSchema.methods.verifyPass = function(password, next) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return next(err)
        next(isMatch)
    })
}

// create the model
const userModel = mongoose.model('User', userSchema)

// export the model
module.exports = userModel
