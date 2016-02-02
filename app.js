// var flash          = require('connect-flash');
var express        = require('express');
var app            = express();
var cors           = require('cors');
var path           = require('path');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require("method-override");
var mongoose       = require('mongoose');
var passport       = require('passport');
var cookieParser   = require("cookie-parser");
var jwt            = require('jsonwebtoken');
var expressJWT     = require('express-jwt');
var layouts        = require('express-ejs-layouts');
var ejs 		   = require('ejs');
var session 	   = require('express-session')

var config         = require('./config/config');
var User           = require('./models/user');
var secret         = require('./config/config').secret;

mongoose.connect(config.database);

app.set('layout', 'layout');

// set views engine to ejs
app.set('view engine', 'ejs');
app.use(layouts);
app.set('views', './views');
//
//app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'))


//app.use(express.static(__dirname + '/public'));




// Will need to fill in /config/passport - Caroline
 require('./config/passport')(passport);



 app.use(cookieParser());
 app.use(morgan('dev'));
 app.use(cors());
 app.use(passport.initialize());
// NOTE: Add in the use layouts

// app.use(flash());

// app.use(bodyParser())

// app.use(methodOverride(function(req, res){
// 	console.log('method:' + req.body._method)
//   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//     var method = req.body._method
//     delete req.body._method
//     return method
//   }
// }));
app.use('/', expressJWT({ secret: secret })
  .unless({
    path: [
      { url: '/login', methods: ['POST'] },
      { url: '/register', methods: ['POST'] },
      { url: '/signup', methods: ['GET']}
    ]
  }));

// app.use(methodOverride('_method'))



var routes = require(__dirname + '/config/routes');
app.use(routes); 

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);