// routes/group.js
var express = require('express');
var router = express.Router();

const Group = require('/Users/depengzhang/Documents/UQ/s2-2023/DECO3801/3801-backend/models/groups.js');
const User = require('/Users/depengzhang/Documents/UQ/s2-2023/DECO3801/3801-backend/models/users.js');

router.post('/createGroup', async (req, res) => {
  const { name, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).send({ message: 'User not found' });

    const group = new Group({ name, members: [user._id] });
    await group.save();
    res.status(200).send({ message: 'Group created successfully', group });
  } catch (error) {
    res.status(500).send({ message: 'Server Error' });
  }
});


router.post('/addMemberToGroup', async (req, res) => {
  const { groupId, userId } = req.body;
  try {
    // Find the group by groupId
    const group = await Group.findById(groupId);
    if (!group) return res.status(400).send({ message: 'Group not found' });

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) return res.status(400).send({ message: 'User not found' });

    // Check if the user is already a member of the group
    if (group.members.includes(userId)) {
      return res.status(400).send({ message: 'User is already a member of the group' });
    }

    // Add the user to the group's members array
    group.members.push(userId);
    await group.save();

    res.status(200).send({ message: 'Member added to group successfully', group });
  } catch (error) {
    res.status(500).send({ message: 'Server Error' });
  }
});


module.exports = router;

