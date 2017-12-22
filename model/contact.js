var mongoose = require('mongoose');
var contactSchema = new mongoose.Schema({
    Name : { type: String },
 Email : { type: String },
 Message : { type: String }
 });


var contact = mongoose.model('contact', contactSchema);

// make this available to our users in our Node applications
module.exports = contact;