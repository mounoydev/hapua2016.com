var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression=require('compression');

var routes = require('./routes/index');
var users = require('./routes/users');
var contact = require('./routes/contact');
var edl = require('./routes/edl');
var hapua = require('./routes/hapua');
var waether = require('./routes/waether');
var agenda = require('./routes/agenda');
var welcome = require('./routes/welcome');

var consolidate = require('consolidate');
var nunjucks = require('nunjucks');


var app = express();

// view engine setup
app.engine('html',consolidate.nunjucks);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname));

//app.use('/', welcome);
app.use('/', routes);
app.use('/welcome', welcome);
app.use('/users', users);
app.use('/contact', contact);
app.use('/edl', edl);
app.use('/hapua', hapua);
app.use('/waether', waether);
app.use('/agenda', agenda);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
