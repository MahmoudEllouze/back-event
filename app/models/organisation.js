
var mongoose = require('mongoose');

// define the schema for our user model
var organisationSchema = mongoose.Schema({

    data : {
        name : String,
        email : String,
        matriculation : String
    }

});


// create the model for users and expose it to our app
module.exports = mongoose.model('Organisation', organisationSchema);
