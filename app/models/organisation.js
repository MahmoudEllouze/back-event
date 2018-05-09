
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
// define the schema for our user model
var organisationSchema = mongoose.Schema({


	companyName : {
        type : String
    },
    description : {
        type : String
    },
    email : {
        type : String
    },
    tradeRegister : {
        type : String
    },
    patent : {
        type : String
    },
    foundationDate : {
        type : Date
    },
    logo : {
        type : String
    },
    legalRepresentant : {
        type : String
    },
    coordinate : {
        country : {
        	type : String
        },
        adress : {
        	type : String
        },
        town : {
        	type : String
        },
        postalCode : {
        	type : String
        },
        phoneNumber : {
        	type : String
        }
    },
    active : {
        type : Boolean 
    },
	creator : ObjectId
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Organisation', organisationSchema);
