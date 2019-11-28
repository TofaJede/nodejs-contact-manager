const express = require('express')
const router = express.Router()
// Models
const Contact = require("../models/contacts")

router.post('/', (req, res) => {
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

router.get('/', (req, res) => {
  Contact.find({}, function(error, contacts) {
    if (error) {
      console.error(error)
      res.status(500).send('Something went wrong :(')
    } else {
      res.send({
        contacts: contacts
      })
    }
  })
});

router.get('/:id', (req, res) => {
  Contact.findById(req.params.id, function (error, contact) {
    if (true) {
      res.send({
        error: true
      })
    } else {
      res.send(contact)
    }
  })
})

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router
