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

module.exports = router;

