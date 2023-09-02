
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // if two condition satisfied that means we have the tokens
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            // console.log("TOken is : " + token);

            // verify that token using decode
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // this wil return (id, CreatedAt, expiryAt) not _id
            // console.log(decoded);

            req.user = await User.findById(decoded.id).select("-password"); // get user without password
            // console.log("checked in our database");

            next(); // goto next operation
        }
        catch (error) {
            res.status(401);
            throw new Error("Not authorized token failed");
        }
    }
    // if not token then 
    if (!token) {
        res.status(401);
        throw new Error("Not authorized No token");
    }
})


module.exports = { protect };