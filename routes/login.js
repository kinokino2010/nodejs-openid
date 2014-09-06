var app = require('../app');

var express = require('express');
var passport = require('passport');
var google = require('passport-google');
var router = express.Router();
var model = require('../model');

var User = model.User;


app.express.use(passport.initialize());
app.express.use(passport.session());

passport.serializeUser(function(user, done) {
	console.log("seri",user);
	done(null, { id : user._id, name : user.name } );
});

passport.deserializeUser(function(obj, done) {
	console.log("deseri",obj);
	User.findById(obj.id,function(err,user){
		if(err){
			console.log(err);
			done(err);
		}else{
			console.log("user",user);
			done(null,user);
		}
	});
});

passport.use(new google.Strategy({
	returnURL:"http://localhost:3000/auth/google/return",
	realm:"http://localhost:3000/",
	profile:true
}
,function(identifier,profile,done){
console.log(profile)	
	var data ={
		name : profile.displayName,
		openid : profile.id
	};
	var user = new User(data);
	user.save(function(err){
		if(err){
			done(err);
		}else{
			console.log(user);
			done(null,user);
		}
	});
}));

router.get('/',function(req,res){
  res.render('login');
});

router.get('/google',passport.authenticate('google'));

router.get('/google/return',
	passport.authenticate('google',{
			successRedirect:'/',
			failureRedirect:'/auth'
	}));


module.exports = router;
