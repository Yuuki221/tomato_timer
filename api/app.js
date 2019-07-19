var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');

var sendUserPwdRouter = require('./routes/sendUserPwd');
var addTimeDurationRouter = require('./routes/addTimeDuration');
var addTimerNumberRouter = require('./routes/addTimerNumber');
var registerAccountRouter = require('./routes/registerAccount');
var testNameDupRouter = require('./routes/testNameDup');
var getAllStatRouter = require('./routes/getStats');
var signupRouter = require('./routes/signup');


var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/testAPI', testAPIRouter);
app.use('/sendUserPwd', sendUserPwdRouter);
app.use('/addTimerNumber', addTimerNumberRouter);
app.use('/addTimeDuration', addTimeDurationRouter);
app.use('/registerAccount', registerAccountRouter);
app.use('/testNameDupRouter', testNameDupRouter);
app.use('/getAllStats', getAllStatRouter);
app.use('/signUp', signupRouter);

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
