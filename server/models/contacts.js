const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactScheme = new Schema({
    name: String,
    surname: String,
    email: String,
    phone: String,
    street: String,
    city: String,
    streetNum: String
});

const Contact = mongoose.model("Contacts", ContactScheme);
module.exports = Contact;
