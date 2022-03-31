const jwt = require('jsonwebtoken')

function decodeToken(token) {   
    const decodedToken = jwt.decode(token)

    return decodedToken.profileJson;    
}


module.exports = {decodeToken: decodeToken}