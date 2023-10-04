var express = require('express');
var router = express.Router();
const User = require('/Users/depengzhang/Documents/UQ/s2-2023/DECO3801/3801-backend/models/users.js');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "YOUR_SECRET_KEY"; 

//http://localhost:3000/users/addUser
router.post('/addUser', async (req, res) => {
  const { fullName } = req.body;
  try {
    // 检查用户名是否已存在
    const existingUser = await User.findOne({ fullName });
    if (existingUser) {
      return res.status(400).send({ status: 'error', message: 'Name already exists' });
    }

    // 创建一个新的用户
    const user = new User({ fullName });
    await user.save();

    // 生成JWT
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });

    // 返回JWT和成功消息
    res.status(200).send({
      status: 'success', 
      message: 'Name saved successfully', 
      token: token // 返回JWT给客户端
    });
  } catch (error) {
      res.status(500).send({ status: 'error', message: 'Server Error' });
  }
});

module.exports = router;


module.exports = router;



