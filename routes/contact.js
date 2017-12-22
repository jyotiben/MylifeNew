var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
    Name: {type: String},
    Email: {type: String},
    Message: {type: String}
});
contact = mongoose.model('contacts', contactSchema);

router.get('/', function(req, res, next) {
  res.render('contact');
});


// insert data into contact table
router.post('/contact-send', function (req,res) {
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

module.exports = router;
