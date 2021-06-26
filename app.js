var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const passport = require("passport");
require('dotenv').config();
var cron = require('node-cron');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const apis = require("./routes/index.router");

var app = express();


// **** config Database
require("./config/database")();

// **** config passport
require("./config/passport").LogIn_JwtStrategy(passport);
require("./config/passport").Facebook_Strategy(passport);

// **** cors Options
var corsOptions = {
  origin: 'https://benzyeiei.herokuapp.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// **** middleware
app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apis);

app.get('/gg', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({
    data:req.user.profile,
    success: true,
    msg: "You are successfully authenticated to this route!"
  });
});


module.exports = app;
