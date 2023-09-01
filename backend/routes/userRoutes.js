
const express = require('express');

// using router from express
const router = express.Router();
// controllers import
const {registerUser, authUser} = require('../controllers/userControllers');

// make router

// when goto api/user then register user form
router.route('/').post(registerUser);
// when goto api/user/login then user login
router.post('/login', authUser);


module.exports = router;