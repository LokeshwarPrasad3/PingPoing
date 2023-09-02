
const express = require('express');

// USER-routes file only contains routes not funcionality that have in controllers 

// using router from express
const router = express.Router();

// controllers import
const { registerUser, authUser, allUsers } = require('../controllers/userControllers');
// it is middleware
const { protect } = require('../middleware/authMiddleware');

// make router COMMON CONVENTION
// when goto api/user then register user form
// router.route means we can make different HTTP request on one
router.route('/').post(registerUser).get(protect, allUsers); // benifit of router .get(middlewareName, methodName)
// when goto api/user/login then user login
router.post('/login', authUser);
// router.route('/').get(allUsers); // 


module.exports = router;