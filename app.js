var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var api = require('./routes/api')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// up file
app.use(express.static("uploads"));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', api)

module.exports = app;
