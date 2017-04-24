/*
 	Define the authentification system and the user model.

	***Password are stored encrypted using Bcrypt algorithm.
*/
const mongoose = require ('mongoose');
const bcrypt = require ('bcryptjs');

var UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
});

// define the model User to be added in the database
var User = module.exports = mongoose.model('User', UserSchema);

/*
	CREATE ADMIN ACCOUNT
*/
var adminUser = new User({
	username: 'admin',
	password: 'admin'
});
createUser(adminUser, function (aux1, aux2) {
	// do nothing
});


/*
	Create new User in the system
*/
// hash the password when creating a new user in the database
function createUser(newUser, callback) {
	bcrypt.genSalt(10, function(err, salt) {
		  bcrypt.hash(newUser.password, salt, function(err, hash) {
			  // store hash
			  newUser.password = hash;
			  newUser.save(callback); // the callback of save is a function(err, user)
	  	  });
	});
}
module.exports.createUser = createUser;

module.exports.getUserByUsername = function(username, callback) {
	User.findOne({
		username: username
	}, callback);
}

module.exports.getUserById = function(id, callback) {
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
		if (err) {
			throw err;
		}
		callback(null, isMatch);
	});
};
