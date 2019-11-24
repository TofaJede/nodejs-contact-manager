const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan'); // Middleware https://github.com/expressjs/morgan

const Post = require("../models/posts");
const Contact = require("../models/contacts");

const app = express()
app.use(morgan('combined')); // Standard Apache combined log output.
app.use(bodyParser.json())
app.use(cors())

// DB Setup
const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL || 'http://localhost';
mongoose.connect(`mongodb://${DATABASE_URL}/posts`, { useNewUrlParser: true }); // /posts means its "posts" database?

var db = mongoose.connection;

db.on('error', function (error) {
  // If first connect fails because server-database isn't up yet, try again.
  // This is only needed for first connect, not for runtime reconnects.
  // See: https://github.com/Automattic/mongoose/issues/5169
  if (error.message && error.message.match(/failed to connect to server .* on first connect/)) {
    setTimeout(function () {
      mongoose.connect(`mongodb://${DATABASE_URL}/posts`, { useNewUrlParser: true }).catch(() => {
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

// SERVER Setup
app.post('/contacts', (req, res) => {
  const data = req.body;

  const { name, surname, email, phone, street, streetNum, city } = data

  const newContact = new Contact({
    name,
    surname,
    email,
    phone,
    street,
    streetNum,
    city
  })

  newContact.save(function (error) {
    if (error) {
      console.error(error)
    }
    res.send({
      success: true,
      message: 'Contact added!'
    })
  })
});

app.get('/posts', (req, res) => {
  Post.find({}, 'title description', function (error, posts) {
    if (error) { console.error(error); }
    res.send({
      posts: posts
    })
  }).sort({_id:-1})
});

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
// Post Endpoints
app.post('/posts', (req, res) => {
  const { title, description } = req.body;
  const new_post = new Post({
    title: title,
    description: description
  });

  new_post.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

// Fetch single post
app.get('/post/:id', (req, res) => {
  Post.findById(req.params.id, 'title description', function (error, post) {
    if (error) { console.error(error); }
    res.send(post)
  })
})

// fetch single contact
app.get('/contact/:id', (req, res) => {
  Contact.findById(req.params.id, function (error, contact) {
    if (error) { console.error(error); }
    res.send(contact)
  })
})

// update contact
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


// Update a post
app.put('/posts/:id', (req, res) => {
  Post.findById(req.params.id, 'title description', function (error, post) {
    if (error) { console.error(error); }

    post.title = req.body.title
    post.description = req.body.description
    post.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

// Delete a post
app.delete('/posts/:id', (req, res) => {
  Post.remove({
    _id: req.params.id
  }, function(err, post){
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

// Delete contact
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
