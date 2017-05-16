'use strict'
var express         = require("express"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    flash           = require('connect-flash'),
    methodOverride  = require("method-override"),
    flashInfo       = require("./middleware/flashInfo"),
    LocalStrategy   = require('passport-local'),
    path            = require('path'),
    routeIndex      = require("./routes/index"),
    routeUser       = require("./routes/user"),
    routePackage    = require("./routes/package"),
    routeComment    = require("./routes/comment"),
    User            = require("./models/user");

var app = express();

mongoose.connect('mongodb://localhost/codeMean');

var port    = process.env.PORT,
    ip      = process.env.IP;


// configure passport
app.use(require("express-session")({
    secret : "secret is...",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());
app.use(flashInfo);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended :true}));
app.use(bodyParser.json());

app.use(routeIndex);
app.use(routeUser);
app.use(routePackage);
app.use(routeComment);

// start server
app.listen(port, ip, function(){
    console.log('SERVER STARTED');
    console.log(new Date().getTime().toString());
});