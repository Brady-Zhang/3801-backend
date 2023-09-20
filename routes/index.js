const mongoose = require("mongoose");

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  mongoose.connect('mongodb+srv://zhangdepeng:cGjEGYEnIkmNZmNO@cluster0.bq5yvel.mongodb.net/natours').then(
    async () => {
      console.log('mongodb connected');
      // const MyModel = mongoose.model('tours', new mongoose.Schema({ name: String , price: Number, rate: Number}));
      // const doc = await MyModel.findOne();
      res.send({
        status: 200,
        data: []
      });
    });
});

module.exports = router;
