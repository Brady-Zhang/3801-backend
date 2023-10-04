// models/user.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    unique: true
  },
  avatar: {
    type: String,  // assuming the avatar is a URL or identifier
    required: true // if you want to ensure every user has an avatar
  }
});

const User = mongoose.model('users', UserSchema);

//export the User model, other files can use it
module.exports = User;


