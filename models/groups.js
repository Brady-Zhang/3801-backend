// models/group.js
const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
// Group is a model based on the schema(GroupSchema)
const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;