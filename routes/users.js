var express = require('express');
var router = express.Router();
const User = require('/Users/depengzhang/Documents/UQ/s2-2023/DECO3801/3801-backend/models/users.js');

//http://localhost:3000/users/addUser
router.post('/addUser', async (req, res) => {
  const { fullName } = req.body;
  try {
    //creat a new User with the extracted name
      const name = new User({ fullName });
      //asynchronously save
      await name.save();
      //200 means ok, request is successful. send back a JSON
      res.status(200).send({ status: 'success', message: 'Name saved successfully' });
  } catch (error) {
      res.status(500).send({ status: 'error', message: 'Server Error' });
  }
});

module.exports = router;