const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String }, // URL or path to the uploaded profile picture
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
