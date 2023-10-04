// models/user.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    unique: true  // 这确保了全名的唯一性
  }
});

const User = mongoose.model('users', UserSchema);

//export the User model, other files can use it
module.exports = User;


