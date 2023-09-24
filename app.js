var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')


const mongoose = require("mongoose");

// 从环境变量或配置文件中获取数据库连接字符串
const dbConnectionString = process.env.DB_CONNECTION_STRING || 'mongodb+srv://zhangdepeng:cGjEGYEnIkmNZmNO@cluster0.bq5yvel.mongodb.net/natours';

// 连接数据库
mongoose.connect(dbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Database connected');
})
.catch(err => {
  console.error('Database connection error:', err);
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//define group router
const groupsRouter = require('./routes/groups');

var app = express();

// enable CORS
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app use group router
app.use('/groups', groupsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
