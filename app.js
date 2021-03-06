// var flash          = require('connect-flash');
var express        = require('express');
var app            = express();
var cors           = require('cors');
var path           = require('path');
var morgan         = require('morgan');
var moment         = require('moment');
var bodyParser     = require('body-parser');
var methodOverride = require("method-override");
var mongoose       = require('mongoose');
var passport       = require('passport');
var expressJWT     = require('express-jwt');
var layouts        = require('express-ejs-layouts');
var ejs 		       = require('ejs');
var session 	     = require('express-session');
var config         = require('./config/config');
var User           = require('./models/user');
var secret         = require('./config/config').secret;


mongoose.connect(config.database);
app.set('layout', 'layout');
// set views engine to ejs
app.set('view engine', 'ejs');
app.use(layouts);
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
require('./config/passport')(passport);
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());

/////////////// protect route////////////////////////////
// unless logged in(ie unless you have a token) then you cannot make a post
//app.post('/api/category', expressJWT({ secret: secret }));
app.post('/api/category/:id/newcomment', expressJWT({ secret: secret }));
app.post('/api/category', expressJWT({ secret: secret }));


// app.put('/api/someotherurl', expressJWT({ secret: secret }));

// route error handler
app.use(function(req, res, next) {
  global.currentUser = req.user;
  next();
  });


app.use(function(err,req,res, next){
    //console.log("bob");
    if(err.name === 'UnauthorizedError'){
        var message = "Please Login or Create an Account";

        //console.log("send back a status of 401, please login or sign up")
        res.status(401).send(message);
    }
});

var routes = require(__dirname + '/config/routes');
app.use(routes); 

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);