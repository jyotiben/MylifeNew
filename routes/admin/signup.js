var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var assert = require('assert');
let Schema = mongoose.Schema;

let AddAdminSingup = mongoose.Schema({

    adminemail: String,
    adminpassword: String

});
let AddSingup = mongoose.model("AddSingup", AddAdminSingup);


router.post('/', function (req, res, next) {

    if (req.session.adminemail) {
        console.log(req.body.admins_email);
        let AddSingupData = new AddSingup({
            adminemail: req.body.admins_email,
            adminpassword: req.body.admins_pass
        });
        console.log(AddSingupData);
        let promise = AddSingupData.save();
        assert.ok(promise instanceof require('mpromise'));

        if (promise) {
            console.log("inserted event data");
            res.redirect('/adminlogin');
        }
        else {
            console.log("error in insert event");
            res.send('err');

        }

    }
    else {
        res.render('admin/adminlogin');
        }

});

module.exports = router;
