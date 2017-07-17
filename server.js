const express           = require ('express');
const path              = require ('path');
const favicon           = require ('serve-favicon');
const bodyParser        = require ('body-parser');
const cookieParser      = require('cookie-parser');
const session           = require('express-session');
const expressValidator  = require('express-validator');
const flash             = require('connect-flash');
const passport          = require('passport');
const LocalStrategy     = require('passport-local').Strategy;
const mongo             = require('mongodb');
const MongoStore        = require('connect-mongo')(session);
const mongoose          = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/loginapp');
const app   = express();
module.exports._app = app;
const db    = mongoose.connection;


const config = require('./config/settings');

// paths
app.use(favicon(path.join(__dirname , './favicon.ico')));

// = MIDDLEWARER
app.use(session({
    secret: 'f1b5b4393ba77bd4520914e0d106c749b829d66e30e152e7917019c35c5c01fe',
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
// Express Validator
app.use(expressValidator({
  customValidators : {
    isNotInList : (val,arr,criteria)=>{
      return arr.filter((el)=>{ return criteria(el,val) }).length < 1;
    },
    isInList : (val,arr,criteria)=>{
      return arr.filter((el)=>{ return criteria(el,val) }).length > 0;
    }
  },
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// views
app.set('view engine' , 'ejs');
app.set('views' , 'front');

// = ROUTES
app.use(express.static(path.join(__dirname , "./public")));
app.use( (req, res, next)  =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
});
app.use(require('./config/routes'));

// = START
app.listen(config.port , ()=> console.log(`[:${config.port}] Server Running.`));
