// routes/group.js
var express = require('express');
var router = express.Router();

const Group = require('/Users/depengzhang/Documents/UQ/s2-2023/DECO3801/3801-backend/models/groups.js');
const User = require('/Users/depengzhang/Documents/UQ/s2-2023/DECO3801/3801-backend/models/users.js');

const authenticateJWT = require('/Users/depengzhang/Documents/UQ/s2-2023/DECO3801/3801-backend/middleware/authentication.js');

router.post('/createGroup', authenticateJWT, async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).send({ status: 'error', message: 'Group name is required' });
    }

    // 确保 req.user 已被身份验证中间件设置
    if (!req.user || !req.user._id) {
        return res.status(401).send({ status: 'error', message: 'User not authenticated' });
    }

    try {
        const group = new Group({
            name: name,
            members: [req.user._id] // 自动将创建者的 userId 添加到 members 中
        });

        await group.save();
        res.status(200).send({ status: 'success', message: 'Group created successfully', group });
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Server Error' });
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

