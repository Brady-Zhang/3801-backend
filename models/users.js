// models/user.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: String
});

const User = mongoose.model('users', UserSchema);

//export the User model, other files can use it
module.exports = User;


