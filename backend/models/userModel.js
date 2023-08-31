const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: 
    },
    pic: {
        // image have url
        type: "String",
        required: true,
        default:
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
}, {
    // it give createdAt, updatedAt
    timestamps: true
})

// make model
const User = new mongoose.model("User", userSchema);

module.exports = User;