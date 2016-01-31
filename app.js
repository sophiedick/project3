// var flash          = require('connect-flash');
var express        = require('express');
var cors           = require('cors');
var path           = require('path');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var passport       = require('passport');
var cookieParser   = require("cookie-parser");
var methodOverride = require("method-override");
var jwt            = require('jsonwebtoken');
var expressJWT     = require('express-jwt');
var layouts        = require('express-ejs-layouts');
var app            = express();

//var config         = require('./config/config');
var User           = require('./models/user');
var secret         = require('./config/config').secret;

//mongoose.connect(config.database);



//app.set('layout', 'layout');


//app.set('view engine', 'ejs');
//app.use(layouts);
//app.set('views', './views');
//
//app.set('views', path.join(__dirname, 'views'));




//app.use(express.static(__dirname + '/public'));




// Will need to fill in /config/passport - Caroline
// require('./config/passport')(passport);


// NOTE: Add in the use layouts

// app.use(flash());


app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());

var routes = require(__dirname + '/config/routes');
app.use(routes);

//app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);