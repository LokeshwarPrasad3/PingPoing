
const mongoose = require('mongoose');
const Message = require('./messageModel');

// making schema
// name of chat
// isgroup chat
// users list
// latest Message
// group admin list

const chatSchema = new mongoose.Schema({
    // name of group/chat
    chatName: {
        type: String,
        trim: true //it remove extra spaces
    },
    // is that group chat or not
    isGroupChat: {
        type: Boolean,
        default: false
    },
    // if group then more than users if not then 2 users
    users: [
        {
            // we refer from different Schema Model
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" // we create User Model which is refer
        }
    ],
    // message which is not seen
    latestMessage: {
        // we refer from different Schema Model
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    // name containing groupAdmin
    groundAdmin: {
        type: mongoose.Schema.Types.ObjectId;
        ref: "User"
    },

},{
    // it give createdAt, updatedAt
    timestamps: true,
}
)

// let create model
const Chat = new mongoose.model("Chat", chatSchema);

// export that
module.exports = Chat;