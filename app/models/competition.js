var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// define the schema for our user model
var competitionSchema = mongoose.Schema({


	organisationId : {
        type : ObjectId
    },
    presentation : {
        type : String
    },
    labele : {
        type : String
    },
    socialMedia : {
        website : {
        	type : String
        },
        facebook : {
        	type : String
        },
        tweeter : {
        	type : String
        }
    },
    active : {
        type : Boolean 
    },
    creatorId : {
        type : ObjectId
    },
    creationDate : {
        type : Date
    },
    updateDate : {
        type : Date
    }
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Competition', competitionSchema);
