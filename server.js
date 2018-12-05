var express, app, bodyParser, server, mongoose, session, flash, path


express = require('express');
app = express();
session = require("express-session");
bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
path = require('path')
flash = require('express-flash')
app.use(flash());
app.use(session({
    secret:"gnomon",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))
//PATHS
app.use(express.static(path.join(__dirname, '/static')));
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs');
server = app.listen(1337)

require('./server/config/mongoose.js')

// MONGOOSE_DB
mongoose = require('mongoose')
mongoose.promise = global.Promise
// SCHEMA

var Snake = mongoose.model('Snake')

require('./server/config/routes')(app)
