var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


const config = require('./config.js');
const mongoose = require('mongoose');
const { error } = require('console');
mongoose.Promise = global.Promise;

mongoose.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => { console.log("Database connected successfully "); }
).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});

app.use('/', indexRouter);
app.use('/api/', apiRouter);
// app.use('/users', usersRouter);

module.exports = app;
