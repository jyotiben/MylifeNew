var express = require('express');


var router = express.Router();

router.get('/', function(req, res, next) {
    if (req.session.adminemail) {
        res.render('admin/admincontact');

    }
    else {
        res.render('admin/adminlogin');
    }

});


router.get('/logout', function (req, res) {
    req.session.destroy();
    res.send("logout success!");
});

// show data in admin side
router.get('/getAdminContactdata', function (req, res) {
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
router.post('/removecontact', function (req, res) {
    contact.remove({_id : req.body.id}, function(err) {
        if (!err) {
            res.send("done");
        }
        else {
            res.send("error");
        }
    });
});


module.exports = router;
