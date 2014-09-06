var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/db');

var UserSchema = new mongoose.Schema({
	name : { type : String },
	openid : { type : String }
});

var User = db.model('user',UserSchema);

exports.User = User;
