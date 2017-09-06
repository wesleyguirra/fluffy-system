const User = require('../models/user'),
    jwt = require('jwt-simple')

module.exports = {
    validateToken: validateToken
}

function validateToken (request, response, next) {
    const token = (request.body && request.body.access_token) || (request.query && request.query.access_token) || request.headers['x-access-token']
    console.log(token)
    if (token) {
        try {
            var decoded = jwt.decode(token, 'fcamara')
            console.log('decoding ' + decoded)
            // verify if token is outdated
            if (decoded.exp <= Date.now()) {
                return response.json(401, {error: 'Access expirated, please login again.'})
            }
            // search for id that came with token
            User.findOne({ _id: decoded.iss }, function(err, user) {
                if(err)
                    response.status(500).json({message: "User not found."})
                request.user = user
                console.log('User found ' + request.user)
                return next()
            })
            // Invalid token
        } catch (err) {
            return response.status(401).json({message: 'Error: It seems that your token is not valid.'})
        }
    } else {
        response.json(401, {message: 'Token not found.'})
    }

}
