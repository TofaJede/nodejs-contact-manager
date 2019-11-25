/*
    https://www.terlici.com/2014/08/25/best-practices-express-structure.html
 */

// Apps Essentials
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan'); // Middleware https://github.com/expressjs/morgan
// Models
const Contact = require("../models/contacts");
// Express Framework
const app = express()

app.use(morgan('combined')); // Standard Apache combined log output.
app.use(bodyParser.json())
app.use(cors())

// DB Setup
const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL || 'http://localhost';
mongoose.connect(`mongodb://${DATABASE_URL}/contactManager`, { useNewUrlParser: true }); // /posts means its "posts" database?

var db = mongoose.connection;

db.on('error', function (error) {
  // If first connect fails because server-database isn't up yet, try again.
  // This is only needed for first connect, not for runtime reconnects.
  // See: https://github.com/Automattic/mongoose/issues/5169
  if (error.message && error.message.match(/failed to connect to server .* on first connect/)) {
    setTimeout(function () {
      mongoose.connect(`mongodb://${DATABASE_URL}/contactManager`, { useNewUrlParser: true }).catch(() => {
        // empty catch avoids unhandled rejections
      });
    }, 20 * 1000);
  } else {
    // Some other error occurred.  Log it.
    console.error(new Date(), String(error));
  }
});

db.once("open", function(callback){
  console.log("Connection Succeeded");
});

// Routes
app.get('/contacts', (req, res) => {
  Contact.find({}, function(error, contacts) {
    if (error) {
      console.error(error)
    }
    res.send({
      contacts: contacts
    })
  })
});

app.get('/contact/:id', (req, res) => {
  Contact.findById(req.params.id, function (error, contact) {
    if (error) { console.error(error); }
    res.send(contact)
  })
})

app.put('/contacts/:id', (req, res) => {
  const { id } = req.params
  Contact.findById(id, function (error, contact) {
    const data = req.body;
    const { name, surname, email, phone, street, streetNum, city } = data

    if (error) {
      console.error(error)
    }

    contact.name = name
    contact.surname = surname
    contact.email = email
    contact.phone = phone
    contact.street = street
    contact.streetNum = streetNum
    contact.city = city

    contact.save(function (error) {
      if (error){
        console.error(error)
      }
      res.send({
        success: true
      })
    })
  })
})

app.delete('/contacts/:id', (req, res) => {
  Contact.remove({
    _id: req.params.id
  }, function (error) {
    if (error) {
      res.send(error)
    }
    res.send({
      success: true
    })
  })
})

app.listen(process.env.PORT || 8081)
