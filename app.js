var express = require('express');
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');

app.set("view engine", "ejs"); 
app.set('trust proxy', 1); // trust first proxy
app.use(cookieParser());
var MemoryStore = session.MemoryStore;

app.use(session({
    name : 'demoCMS.sid',
    secret: "1234567890QWERTY",
    resave: true,
    store: new MemoryStore(),
    saveUninitialized: true,
    cookie: {
        httpOnly: false, 
        secure: false, 
        maxAge: 3600000
    }
}));

 //the routes
var homePage  = require('./routes/homePage');
var login     = require('./routes/login');
var dashboard = require('./routes/dashboard');
var signUp    = require('./routes/signUp');
var logout    = require('./routes/logout');
var testPage  = require('./routes/testPage');
var logOut    = require('./routes/logOut');

app.use('/public', express.static(__dirname+'/public'));

app.use('/', homePage);
app.use('/login', login);
app.use('/signup', signUp);
app.use('/dashboard', dashboard);
app.use('/logout', logout);
app.use('/testpage', testPage);
app.use('/logout', logOut);
// app.use(function(req, res, next){
//     res.cookie('cookieName', 'cookieValue');
//     next();
// });
  
var port  = process.env.PORT || 3000;
app.listen(port, function(){  
    console.log('server starts!');
});
 
 
