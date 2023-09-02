// // HERE we define all the routes of chat operations routes

const express = require('express');

// getting Chat models
const Chat = require('../models/chatModel');

const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const accessChat = asyncHandler(async (req, res) => {
    // Define an asynchronous route handler using the asyncHandler middleware.

    // Extract the 'userId' from the request body.
    const { userId } = req.body;

    // Check if 'userId' is missing in the request.
    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400); // Return a 400 status code (Bad Request) if 'userId' is missing.
    }

    // Check if a chat exists between the current user (req.user) and the specified 'userId'.
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            // Check if the current user is one of the participants.
            { users: { $elemMatch: { $eq: req.user._id } } }, // req.user is extracted from the authentication token.
            // Check if 'userId' is one of the participants.
            { users: { $elemMatch: { $eq: userId } } }
        ]
    })
        // Populate user profiles and the latest message in the chat.
        .populate("users", "-password")
        .populate("latestMessage");

    // If chats are successfully populated.
    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: "name pic email",
    });

    // If a chat exists.
    if (isChat.length > 0) {
        res.send(isChat[0]); // Send the chat data as a response.
    } else {
        // If no chat exists, create a new chat with the current user and 'userId'.
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId], // Participants are the current user and 'userId'.
        };

        try {
            // Create the new chat.
            const createdChat = await Chat.create(chatData);
            // Fetch the newly created chat with user data.
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            // res.send(fullChat); // Optionally, send the created chat as a response.
        } catch (error) {
            res.status(400); // Set the response status to 400 (Bad Request) in case of an error.
            throw new Error(error.message); // Throw an error with the error message.
        }
    }
});


module.exports = { accessChat };