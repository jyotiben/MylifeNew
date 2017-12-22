var express = require('express'),
    app = express(),
    session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//task1

var dbConn = mongoose.connect('mongodb://localhost/Trip', {
    useMongoClient: true,

});
if (dbConn) {
    console.log('suceess');
} else {
    console.log('fail');
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/contact', require('./routes/contact'));
app.use('/about', require('./routes/about'));
app.use('/trainer', require('./routes/trainer'));
app.use('/schedule', require('./routes/schedule'));
app.use('/classes', require('./routes/classes'));
app.use('/bing1', require('./routes/bing1'));
app.use('/adminlogin', require('./routes/admin/adminlogin'));
app.use('/admin/signup', require('./routes/admin/signup'));
app.use('/admincontact', require('./routes/admin/admincontact'));
app.use('/adminhome', require('./routes/admin/adminhome'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
