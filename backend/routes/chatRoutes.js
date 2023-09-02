
const express = require('express');

// // // CHAT-routes file only contains routes not funcionality that have in controllers 

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
// // // operation of chat controllers
const { accessChat } = require('../controllers/chatControllers');


// // // making api/chat (which is creating and getting chat)
router.route("/").post(protect, accessChat);
// // // router.route("/").get(protect, fetchChat);
// // // router.route("/group").post(protect, createGroupChat);
// // // router.route("/rename").put(protect, renameGroup); // update name of group
// // // router.route("/groupremove").put(protect, renameGroup); // update name of group
// // // router.route("/groupremove").put(protect, removeFromGroup); // update name of group
// // // router.route("/groupadd").put(protect, addToGroup); // update name of group

module.exports = router;