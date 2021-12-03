//third party installation 
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//module for authentication
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');


//database setup
let mongoose = require('mongoose');
let DB = require('./db');

//point mongoose to the DB URI
//connecting DB to URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.connect(DB.URI);

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', () => {
  console.log('Connected to MongoDB. . .');
});

let indexRouter = require('../routes/index');
//let usersRouter = require('../routes/users');
let surveyRouter = require('../routes/survey-answer');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

//initialize flash for messages
app.use(flash());

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//create a user model instance for the passport user configuration
let userModel = require('../models/user');
let User = userModel.User;

//user strategy for authentication login
passport.use(User.createStrategy());

//encrypt and decrypt user information
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/survey-list', surveyRouter);

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
//app.use('/survey-answer', surveyRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

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
  res.render('error', { title: 'Error' });
});

module.exports = app;
