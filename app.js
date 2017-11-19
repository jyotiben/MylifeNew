var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var dbConn = mongoose.connect('mongodb://localhost/Trip',{
 useMongoClient:true,

});
if (dbConn) {
    console.log('suceess');
} else {
    console.log('fail');
}

var url = 'mongodb://localhost:27017/Trip';
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/contact', require('./routes/contact'));
app.use('/about', require('./routes/about'));
app.use('/trainer', require('./routes/trainer'));
app.use('/schedule', require('./routes/schedule'));
app.use('/classes', require('./routes/classes'));
app.use('/admin', require('./routes/admin/admincontact'));

var contactSchema = new mongoose.Schema({
    Name: {type: String},
    Email: {type: String},
    Message: {type: String}
});
contact = mongoose.model('contact', contactSchema);

app.post('/contact-send', function (req,res) {
        var contactinfo = new contact ({
            Name:  req.body.name,
            Email:  req.body.email,
            Message: req.body.message,
        });
        contactinfo.save(function(err, thor) {
            if (err){
                return res.send("error");
            }else{
                console.log('record added');
                return res.redirect("/");
            }
        });


});

app.get('/getAdminContactdata', function (req,res) {
    contact.find({'Description' : new RegExp(req.body.keyword, 'i')}, function (err, docs1) {
        if (err) {
            throw err;
        }
        else {
            res.type('text/plain');
            res.json(docs1);
           // res.send('gb');
        }
    });


});

//app.use('/contact-send', require('./routes/contact'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
