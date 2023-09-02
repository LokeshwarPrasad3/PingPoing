
const express = require('express');

// // // CHAT-routes file only contains routes not funcionality that have in controllers 

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
// // // operation of chat controllers
const { accessChat, fetchChat, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require('../controllers/chatControllers');


// // // making api/chat (which is creating and getting chat)
router.route("/").post(protect, accessChat); // access and create new chat
router.route("/").get(protect, fetchChat); // fetch chat
router.route("/group").post(protect, createGroupChat); // create group
router.route("/rename").put(protect, renameGroup); // rename group
router.route("/groupadd").put(protect, addToGroup); // add user from group
router.route("/groupremove").put(protect, removeFromGroup); // remove user from group
// // // router.route("/groupremove").put(protect, renameGroup); // remove group

module.exports = router;