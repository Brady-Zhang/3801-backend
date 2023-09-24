const mongoose = require("mongoose");


var express = require('express');
var router = express.Router();


/* GET home page. */
const MyModel = mongoose.model('tours', new mongoose.Schema({ name: String , price: Number, rate: Number}));
router.get('/index', async function (req, res, next) {
  try {
    console.log('Querying database');
    const doc = await MyModel.findOne({price: 297});
    console.log(doc);
    res.send({
      status: 200,
      data: doc
    });
  } catch(err) {
    console.error('Error querying database:', err);
    res.status(500).send({ status: 500, error: 'Internal Server Error' });
  }
});

module.exports = router;
