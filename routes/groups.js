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


//邀请别人加入
router.post('/groups/join', authenticateJWT, async (req, res) => {
  //发送到此路由的请求应该在其主体中包含一个groupId
  const { groupId } = req.body;
  const userId = req.user._id;

  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(400).send({ message: 'Group not found' });

    if (group.members.includes(userId)) {
      return res.status(400).send({ message: 'User is already a member of the group' });
    }

    group.members.push(userId);
    await group.save();

    res.status(200).send({ message: 'Member added to group successfully', group });
  } catch (error) {
    res.status(500).send({ message: 'Server Error' });
  }
});
//根据user获取小组列表（所有加入或创建的小组）
router.get('/getUserGroups', authenticateJWT, async (req, res) => {
  const userId = req.user._id;

  try {
      const groups = await Group.find({ members: userId });
      res.status(200).send({ status: 'success', groups });
  } catch (error) {
      res.status(500).send({ status: 'error', message: 'Server Error' });
  }
});
module.exports = router;
