// models/user.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: String
});

const User = mongoose.model('users', UserSchema);

module.exports = User;


