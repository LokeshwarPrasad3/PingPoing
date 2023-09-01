const mongoose = require('mongoose');

//Just before saving using bcrypt that hash password
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
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



// excecute Just before Save data it encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    // if any of the user password is modified then we need to change password hash
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt); // we can use this inCase of Schema related 
    }
    next(); // goto next middleware
})

// compare JWT password which is same as db user password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password); // we can use this inCase of Schema related 
}


// make model
const User = new mongoose.model("User", userSchema);

module.exports = User;