//  It's commonly used for authentication and authorization in web applications. 
//  When a user logs in, the token setted on browser and JWT that proves their identity,
//  and this token is sent with subsequent requests. 



const jwt = require('jsonwebtoken');

// getting secret key from .env
const JWT_SECRET = process.env.JWT_SECRET;

// making method which generate jwt
const generateToken = (id) => {
    // Using sign method to generate token 
    return jwt.sign({ id }, JWT_SECRET, { // taking two object {userId : secretKey}, {expiryIn : 'days'}
        expiresIn: '30d'
    });
};

module.exports = generateToken;