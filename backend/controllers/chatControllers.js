// // HERE we define all the routes of chat operations routes

// getting Chat models
const Chat = require('../models/chatModel');

const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// This route handles access to a chat with a specified user.

const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;
  
    // Check if userId is provided in the request body
    if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
    }
  
    // Check if a chat exists between the authenticated user and the specified user
    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
  
    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
  
    // If a chat exists, send it as the response
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      // If no chat exists, create a new chat and send it as the response
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };
  
      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        res.status(200).json(FullChat);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
  });
  


// Import the 'asyncHandler' middleware, which simplifies error handling in asynchronous code.
const fetchChat = asyncHandler(async (req, res) => {
    try {
        // Attempt to fetch chat data for the logged-in user.

        // Find chats where the user is a participant.
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            // Populate the 'users' field, excluding the 'password' field.
            .populate("users", "-password")
            // Populate the 'groupAdmin' field, excluding 'password'.
            .populate("groupAdmin", "-password")
            // Populate the 'latestMessage' field.
            .populate("latestMessage")
            // Sort the results by 'updatedAt' in descending order (latest first).
            .sort({ updatedAt: -1 })
            .then(async (results) => {

                // Once data is retrieved, populate the 'latestMessage.sender' field.
                // Populate the 'latestMessage.sender' field with user details.
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    // Select specific fields ('name', 'pic', 'email').
                    select: "name pic email",
                });
                // Send the populated chat data as a response with a 200 status code (OK).

                res.status(200).send(results);
            });
    } catch (error) {
        // Handle any errors that occur during chat data retrieval.
        console.log("Error occur during fetch chat");
    }
});



// Create a group chat API route
const createGroupChat = asyncHandler(async (req, res) => {
    // Check if the request body contains the 'users' and 'name' fields
    if (!req.body.users || !req.body.name) {
        res.status(400).send({ message: "Please fill all the fields" });
    }

    // Parse the 'users' JSON string from the request body into an array
    var users = JSON.parse(req.body.users);

    // Check if there are at least two users to form a group chat
    if (users.length < 2) {
        return res
            .status(400)
            .send("More than 2 users are required to form a group chat");
    }

    // Add the logged-in user (req.user) to the 'users' array
    users.push(req.user);

    try {
        // Create a new group chat document in the database
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        // Fetch the newly created group chat document with user and admin data populated
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password") // Populate the 'users' field excluding passwords
            .populate("groupAdmin", "-password"); // Populate the 'groupAdmin' field excluding passwords

        // Respond with the full group chat data
        res.status(200).json(fullGroupChat);
    } catch (error) {
        // Handle errors by setting the response status to 400 (Bad Request) and throwing an error
        res.status(400);
        throw new Error(error.message);
    }
});



// Define a route handler for renaming a group chat's name
const renameGroup = asyncHandler(async (req, res) => {
    // Extract chatId and chatName from the request body
    const { chatId, chatName } = req.body;

    // Update the chat's name using Mongoose's findByIdAndUpdate method
    // chatId is used to identify the chat to update, chatName is the new name
    // The { new: true } option ensures the updated chat is returned
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { chatName: chatName },
        { new: true }
    )

        // Populate the 'users' and 'groupAdmin' fields of the updated chat document
        // '-password' is used to exclude passwords from user data for security
        .populate("users", "-password").populate("groupAdmin", "-password");

    // Check if the chat was not found (updatedChat is falsy)
    if (!updatedChat) {
        res.status(404); // Set response status to 404 (Not Found)
        throw new Error("Chat not found"); // Throw an error with a message
    } else {
        res.json(updatedChat); // Send the updated chat data as a JSON response
    }
});


// add users to group
const addToGroup = asyncHandler(async (req, res) => {
    // Extract 'chatId' and 'userId' from the request body
    const { chatId, userId } = req.body;

    // Add the 'userId' to the 'users' array in the 'Chat' document specified by 'chatId'
    const added = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId } // Push the new 'userId' to the 'users' array
        },
        { new: true } // Return the updated document
    )
        // Populate the 'users' and 'groupAdmin' fields for the updated 'Chat' document
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    // Check if the 'Chat' document was not found
    if (!added) {
        res.status(404); // Set a 404 status code
        throw new Error("Chat not found"); // Throw an error indicating that the chat was not found
    } else {
        res.json(added); // Send the updated 'Chat' document as a JSON response
    }
});


// remove user frm grop
const removeFromGroup = asyncHandler(async (req, res) => {
    // Extract 'chatId' and 'userId' from the request body
    const { chatId, userId } = req.body;

    // Remove the 'userId' from the 'users' array in the 'Chat' document specified by 'chatId'
    const removed = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId } // Pull (remove) the 'userId' from the 'users' array
        },
        { new: true } // Return the updated document
    )
        // Populate the 'users' and 'groupAdmin' fields for the updated 'Chat' document
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    // Check if the 'Chat' document was not found
    if (!removed) {
        res.status(404); // Set a 404 status code
        throw new Error("Chat not found"); // Throw an error indicating that the chat was not found
    } else {
        res.json(removed); // Send the updated 'Chat' document as a JSON response
    }
});





module.exports = { accessChat, fetchChat, createGroupChat, renameGroup, addToGroup, removeFromGroup };