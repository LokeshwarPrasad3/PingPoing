const mongoose = require('mongoose');


// who is send name and id
// content of message
// which receiver 

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        trim: true;
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }
}, {
    // it give createdAt, updatedAt
    timestamps: true,
})

// make model
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;