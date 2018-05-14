var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

// define the schema for our user model
var editionSchema = mongoose.Schema({


	competitionId : {
        type : ObjectId
    },
    presentation : {
        type : String
    },
    numero : {
        type : Number
    },
    active : {
        type : Boolean 
    },
    year : {
        type : Number
    },
    creationDate : {
        type : Date
    },
    updateDate : {
        type : Date
    },
    dosar : [{
        placement : {
            type : String
        },
        debutDate : {
            type : Date
        },
        endDate : {
            type : Date
        },
        coordinate : {
            lattitude : {
                type : Number
            },
            longitude : {
                type : Number
            }
        },
        electronic : {
            type : Boolean
        }
    }],
    contact : [{
        name : {
            type : String
        },
        phoneNumber : {
            type : String
        },
        email : {
            type : String
        }
    }],
    responsable : [{
        idUser : {
            type : ObjectId
        },
        mission : {
            type : String
        }
    }],
    rules : [{
        libele : {
            type : String
        },
        link : {
            type : String
        }
    }],
    service : {
        locker : {
            type : Boolean
        },
        freeBreackfast : {
            type : Boolean
        },
        freeAccomodation : {
            type : Boolean
        },
        accomodationPrice : {
            type : Number
        },
        freeTravel : {
            type : Boolean
        },
        travelPrice : {
            type : Number
        },
        Carpooling : {
            type : Boolean
        }
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
    }
});


// create the model for users and expose it to our app
module.exports = mongoose.model('Edition', editionSchema);
