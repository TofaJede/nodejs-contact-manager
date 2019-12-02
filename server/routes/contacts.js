const express = require('express')
const router = express.Router()
// Controller
const contactController = require('../controllers/contact')

router.post('/', async (req, res) => {
  const data = req.body;
  const newContact = await contactController.newContact(data)

  if (!newContact){
    res.send({
      error: true,
      success: false
    })
  } else {
    res.send({
      error: false,
      success: true,
      newContact
    })
  }
});

router.get('/', async (req, res) => {
  const allContactData = await contactController.getAllContacts()
  if (allContactData){
    res.send({
      contacts: allContactData,
      error: false
    })
  } else {
    res.send({
      error: true
    })
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const contactData = await contactController.getContact(id)

  if (contactData){
    res.send({
      contact: contactData,
      error: false
    })
  } else {
    res.send({
      error: true
    })
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const data = req.body;

  const contactUpdated = await contactController.editContact(id, data)

  if (!contactUpdated) {
    res.send({
      error: true,
      success: false
    })
  } else {
    res.send({
      error: false,
      success: true,
      contactUpdated
    })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  const contactDelete = await contactController.deleteContact(id)

  if (!contactDelete){
    res.send({
      error: true,
      success: false
    })
  } else {
    res.send({
      error: false,
      success: true,
      contactDelete
    })
  }
})

module.exports = router
