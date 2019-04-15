const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const aouthGoogle = require('./routes/aouth');
const { GMAIL_CLIENT_ID, CLIENT_SECRET } = require('./config/client-config.js');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const app = express();
// const strategy = require('./config/strategy');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth/google', aouthGoogle);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
passport.use(new GoogleStrategy({ clientID: GMAIL_CLIENT_ID, clientSecret: CLIENT_SECRET, callbackURL: 'http://localhost:3000/auth/google/callback' },
//   (token, refreshToken, profile, done) => { 

//   process.nextTick(() => { console.log('hi'+ refreshToken) 
//   fs.writeFile('q.json', JSON.stringify(refreshToken), (err) => {
//     if (err) return console.error(err);
//     console.log('Token stored to', 'q.json');
// });
//  })
(token, refreshToken, profile, done) => {
  return done(null, {
  profile: profile,
  token: token
  });
  
}));



module.exports = app;
