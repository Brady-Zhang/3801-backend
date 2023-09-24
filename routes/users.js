var express = require('express');
var router = express.Router();
const User = require('/Users/depengzhang/Documents/UQ/s2-2023/DECO3801/3801-backend/models/users.js');

//http://localhost:3000/users/addUser
router.post('/addUser', async (req, res) => {
  const { fullName } = req.body;
  try {
      const name = new User({ fullName });
      await name.save();
      res.status(200).send({ status: 'success', message: 'Name saved successfully' });
  } catch (error) {
      res.status(500).send({ status: 'error', message: 'Server Error' });
  }
});

module.exports = router;