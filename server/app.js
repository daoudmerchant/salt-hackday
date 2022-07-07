const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

// const passport = require("./app-passport");
const userRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(session({ secret: "salthackday", resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/users', userRouter);

module.exports = app;
