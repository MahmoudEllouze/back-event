var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// define the schema for our user model
var raceSchema = mongoose.Schema({


	editionId : {
        type : ObjectId
    },
    type : {
        type : String
    },
    libeleRace : {
        type : String
    },
    distance : {
        type : Number
    },
    presentation : {
        type : String
    },
    libele : {
        type : String
    },
    dateRace : {
        type : Date
    },
    hourRace : {
        type : Date
    },
    active : {
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
module.exports = mongoose.model('Race', raceSchema);
