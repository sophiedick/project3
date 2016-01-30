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
var app            = express();

var config         = require('./config/config');
var User           = require('./models/user');
var secret         = require('./config/config').secret;

mongoose.connect(config.database);

// Will need to fill in /config/passport - Caroline
// require('./config/passport')(passport);

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

// app.use('/', expressJWT({ secret: secret })
//   .unless({
//     path: [
//       { url: '/login', methods: ['POST'] },
//       { url: '/register', methods: ['POST'] }
//     ]
//   }));

// app.use(function (err, req, res, next) {
//   if (err.name === 'UnauthorizedError') {
//     return res.status(401).json({message: 'Unauthorized request.'});
//   }
//   next();
// });


var routes = require('./config/routes');
app.use("/", routes);

app.listen(3000);