//===================================
// default express framwork
//===================================
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//===================================
// include moment, moment-timezome
//===================================
var moment = require('moment');
var momentTimezone = require('moment-timezone');
//===================================
// define routers
//===================================
var index = require('./routes/index');
var users = require('./routes/users');
var clients = require('./routes/clients');
var serialNumbers = require('./routes/serialNumbers');
var identifies = require('./routes/identifies');
var identifyGroups = require('./routes/identifyGroups');
var permissions = require('./routes/permissions');
var clouds = require('./routes/clouds');
var deviceInfo = require('./routes/deviceInfo');
var devices = require('./routes/devices');
var deviceGroups = require('./routes/deviceGroups');
var automations = require('./routes/automations');
var groups = require('./routes/groups');
var scenes = require('./routes/scenes');

var app = express();
//===================================
// view engine setup
//===================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//===================================
// define url
//===================================
app.use('/', index);
app.use('/users', users);
app.use('/clients', clients);
app.use('/serialNumbers', serialNumbers);
app.use('/identifies', identifies);
app.use('/identifyGroups', identifyGroups);
app.use('/permissions', permissions);
app.use('/clouds', clouds);
app.use('/deviceInfo', deviceInfo);
app.use('/devices', devices);
app.use('/deviceGroups', deviceGroups);
app.use('/automations', automations);
app.use('/groups', groups);
app.use('/scenes', scenes);
//===================================
// catch 404 and forward to error handler
//===================================
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
//===================================
// define locals moment variable
//===================================
app.locals.moment = moment;
app.locals.momentTimezone = momentTimezone;

module.exports = app;
