/*
    https://www.terlici.com/2014/08/25/best-practices-express-structure.html
 */

// Apps Essentials
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan'); // Middleware https://github.com/expressjs/morgan
const contacts = require('../routes/contacts') // route

// Express Framework
const app = express()

app.use(morgan('combined')); // Standard Apache combined log output.
app.use(bodyParser.json())
app.use(cors())

// DB Setup
const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL || 'http://localhost';
mongoose.connect(`mongodb://${DATABASE_URL}/contactManager`, { useNewUrlParser: true }); // /posts means its "posts" database?

const db = mongoose.connection;

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
app.use('/contacts', contacts)

app.listen(process.env.PORT || 8081)
