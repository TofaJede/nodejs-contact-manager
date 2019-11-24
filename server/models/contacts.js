var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ContactScheme = new Schema({
    name: String,
    surname: String,
    email: String,
    phone: String,
    street: String,
    city: String,
    streetNum: String
});

var Contact = mongoose.model("Contacts", ContactScheme);
module.exports = Contact;
