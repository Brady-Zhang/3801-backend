var express = require('express');
var router = express.Router();
const User = require('/Users/depengzhang/Documents/UQ/s2-2023/DECO3801/3801-backend/models/users.js');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "YOUR_SECRET_KEY"; 

//http://localhost:3000/users/addUser
router.post('/addUser', async (req, res) => {
  const { avatar, fullName } = req.body;

  if (!avatar) {
    return res.status(400).send({ status: 'error', message: 'Avatar is required' });
  }

  try {
    // check user exist
    const existingUser = await User.findOne({ fullName });
    if (existingUser) {
      return res.status(400).send({ status: 'error', message: 'Name already exists' });
    }

    // creat a new user
    const user = new User({ avatar, fullName});
    await user.save();

    // creat a JWT
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });

    // return the JWT
    res.status(200).send({
      status: 'success', 
      message: 'Name saved successfully', 
      token: token // return JWT to front-end
    });
  } catch (error) {
      res.status(500).send({ status: 'error', message: 'Server Error' });
  }
});
// http://localhost:3000/users/getAvatarByName
router.get('/getAvatarByName', async (req, res) => {
  const { fullName } = req.query; // 获取查询参数中的fullName

  if (!fullName) {
      return res.status(400).send({ status: 'error', message: 'Name is required' });
  }

  try {
      const user = await User.findOne({ fullName });
      if (!user) {
          return res.status(404).send({ status: 'error', message: 'User not found' });
      }

      res.status(200).send({
          status: 'success',
          avatar: user.avatar // 返回头像URL或数据
      });
  } catch (error) {
      res.status(500).send({ status: 'error', message: 'Server Error' });
  }
});


module.exports = router;



