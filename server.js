// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8085;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var cors = require('cors');

require('dotenv').config();


var mongoAdress = 'mongodb://'+process.env.DB_HOST+':'+process.env.DB_PORT+"/"+process.env.DB_NAME
mongoose.connect(mongoAdress);


require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session
	app.use(cors());
});

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(process.env.SERVER_PORT);
console.log('The magic happens on port ' + process.env.SERVER_PORT);
