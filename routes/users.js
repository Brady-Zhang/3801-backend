var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

/* GET users listing. */
const User = mongoose.model('users', new mongoose.Schema({
  fullName: String
}));

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
