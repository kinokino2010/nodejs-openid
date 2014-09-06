var express = require('express');
var bodyParser = require('body-parser');
var cookieParser=require('cookie-parser');
var session=require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

var app = express();

exports.express = app;

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser());
app.use(cookieParser());
app.use(session({
	secret:'hogehoge',
	resave:false,
	saveUninitialized:false,
	store:new MongoStore({
		db:"db",
	})
}));

var auth = require('./routes/login');
app.use('/auth', auth);
app.use(express.static( __dirname + '/public'));


var loginCheck = function(req, res, next) {

console.log("session",req.session);	
    if(req.session.passport && req.session.passport.user){
      	console.log("session found.");
      next();
    }else{
      	console.log("session not found.");
	res.redirect('/auth');
    }
};

app.get("/",loginCheck,function(req,res){
	console.log(req.session);
	res.render("index",{"user":req.session.passport.user.name});
});

app.listen(3000);

console.log("start server");

module.exports = app;
