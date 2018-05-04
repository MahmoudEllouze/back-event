// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    email : {
        type : String,
        unique : true
    },
    password : {
        type : String
    },

    firstname : {
        type : String,
        required: [true, 'Firstname is required']
    },

    lastname : {
        type : String,
        required: [true, 'Lastname is required']
    },

    cin : {
        type : String,
        unique : true
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
// userSchema.path('color').validate(function (value) {
//   return /blue|green|white|red|orange|periwinkel/i.test(value);
// }, 'Invalid color');
// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
