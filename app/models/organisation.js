
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
// define the schema for our user model
var organisationSchema = mongoose.Schema({


	name : String,
	email : String,
	matriculation : String,
	creator : ObjectId


});


// create the model for users and expose it to our app
module.exports = mongoose.model('Organisation', organisationSchema);
