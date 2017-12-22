var express = require('express');


var router = express.Router();

router.get('/', function (req, res, next) {
    if (req.session.adminemail) {
        res.render('admin/adminhome');
    }
    else {
        res.render('admin/adminlogin');
    }
});


module.exports = router;
