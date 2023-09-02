// controller is control data which is store

// here we using asyncHandler need installation which handle all error bydefault
const asyncHandler = require('express-async-handler');
// taking collection of user
const User = require('../models/userModel');
// method which is generate jwt token and return
const generateToken = require('../config/generateToken');

// function which register user
// if we use asyncHandler then no need to handle try-catch async-handler is handle all 
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password, picture } = req.body;
    // if any field undefined then give error
    if (!name || !email || !password) {
        res.status(400).json({ message: "Please enter all the fields" }); // .message("Please fill al fields")
        console.log("Please enter all the fields");
    }
    // check user is exist in out db or not
    const userExists = await User.findOne({ email });
    // if exist then give error
    if (userExists) {
        res.status(400).json({ message: "User already exist" });
        console.log("User already exist");
    }
    // if unique user then create and saved (not need to .save() extra method)
    const user = await User.create({
        name, email, password, picture
    })
    // if successfully created
    if (user) {
        const data =
        {
            _id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            picture: user.picture,
            // the token is now generated and stored for user._id (./config/generateToken)
            token: generateToken(user._id)
        }
        res.status(201).json(data);
        console.log("New User Created ", data)
    } else {
        throw new Error("Failded to create User");
    }
});

// function which login user
const authUser = asyncHandler(async (req, res) => {
    // getting email pass from frontend
    const { email, password } = req.body;
    // check that values is not empty
    if (!email || !password) {
        res.status(400).json({ message: "Enter valid input" });
    }
    // checking that exist on db
    const user = await User.findOne({ email });
    // if valid user
    // made separate method that compare password of user (./models/UserModel)
    if (user && (await user.matchPassword(password))) {
        const data =
        {
            _id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            picture: user.picture,
            // the token is now generated and stored for user._id (./config/generateToken)
            token: generateToken(user._id)
        }
        res.status(200).json(data);
        console.log("Login Successfully ", data)
    } else {
        // unAutherized user
        res.status(401).json({ message: "User Not Found" });
        console.log("User not found");
    }

});


// function which get all users (get request)
// /api/user?search=piyush - (get query using req.query.search) 
// /api/user:id - (get id using req.params.id) 
const allUsers = asyncHandler(async (req, res) => {
    // this get all the user except existing user
    
    const keyword = req.query.search ? { //keyword is get name or email of user
        $or: [ // anyone from that query then return data 
            { name: { $regex: req.query.search, $options: "i" } }, // return name
            { email: { $regex: req.query.search, $options: "i" } }, // return email
        ]
    } : {};

    // find that user using query parameter
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });// give all user except existing logged user
    res.send(users);
    console.log("alluser console");

})

module.exports = { registerUser, authUser, allUsers };