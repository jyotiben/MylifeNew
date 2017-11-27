var express = require('express');
var app = express();
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
app.use('/admincontact', require('./routes/admin/admincontact'));
app.use('/admindashboard', require('./routes/admin/admindashboard'));


var contactSchema = new mongoose.Schema({
    Name: {type: String},
    Email: {type: String},
    Message: {type: String}
});
contact = mongoose.model('contacts', contactSchema);
// insert data into contact table
app.post('/contact-send', function (req,res) {
        var contactinfo = new contact ({
            Name:  req.body.name,
            Email:  req.body.email,
            Message: req.body.message

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

/* contactall = contact.find({_id: { $in : contact.id } },{name: { $in : contact.name } } );
app.get('/getAdminContactdata', function (req, res, next) {
    contactall
        .then(function (data) {
            if (data) {
               // res.send(data);
                res.render('admin/contactdatashow');
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}); */
// show data in admin side
app.get('/getAdminContactdata', function (req, res) {
    contact.find(function (err, docs) {
        if(docs){
            console.log(docs);
            res.send(docs);
        }
        else
        {res.status(400).send(err)}
        });
});

// call remove  category
app.post('/removecontact', function (req, res) {
    contact.remove({_id : req.body.id}, function(err) {
        if (!err) {
            res.send("done");
        }
        else {
            res.send("error");
        }
    });
});


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
