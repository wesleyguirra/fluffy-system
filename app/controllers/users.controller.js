const User = require('../models/user'),
    jwt = require('jwt-simple'),
    moment = require('moment')

module.exports = {
    seedUsers: seedUsers,
    loginUser: loginUser,
    createUser: createUser,
    showUsers: showUsers
}

function showUsers (response) {
    //get all products
    User.find({}, (err, users) => {
        if(err)
        response.status(404).json({message: 'Users not found.'})
    response.status(200).json(users)
})

}

function createUser (request, response) {
    // create new object from form
    var newUser = new User({
        username: request.body.username,
        password: request.body.password
    })
    // save this object on db
    newUser.save(function(err){
        if (err)
            response.status(500).json({ message: err })
        response.status(200).json({message: 'User created!', data: newUser})
    })
}


function loginUser (request, response) {
    // set user from form or front-end
    const username = request.body.username,
        password = request.body.password

    // find one user that match with body username
    User.findOne({username: username}, (err, user) => {
        if(!user)
            response.status(401).json({message: 'User not found.'})

        // compare password of body with password at db
        user.verifyPass(password, function(isMatch){
            if(!isMatch)
                response.status(401).json({message: 'Password does not match.'})
            // set expiration time and token with secret fcamara
            var expires = moment().add(60, 'minutes').valueOf(),
                token = jwt.encode({
                    iss: user.id,
                    exp: expires
                }, 'fcamara')

            return response.json({
                token: token,
                expires: expires,
                user: user.toJSON()
            })
        })
    })
}

// seed database
function seedUsers (response) {
    // create user
    const users = [
        { username: 'fcamara', password: 'fcamara' },
        { username: 'dev', password: 'dev@secret' }
    ]

    // use the User model to insert/save
    for (user of users) {
        var newUser = new User(user)
        newUser.save()
    }

    // seeded!
    response.json({message: 'Database seeded!'})
}
