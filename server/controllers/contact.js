const Contact = require("../models/contacts")

export const getAllContacts = async () => {
  // lean() -- return native object
  const contacts = await Contact.find({}).lean()
  if (!contacts) return null
  return contacts
}

export const getContact = async (id) => {
  const contact = await Contact.findById(id)
  if (!contact) return null
  return contact
}

export const editContact = async (id, data) => {
  const contact = await Contact.findById(id)
  if (!contact) return null
  await contact.set(data)
  await contact.save()
  return contact
}

export const newContact = async (data) => {
  const contact = await new Contact(data)
  await contact.save()
  return contact
}

export const deleteContact = async (id) => {
  const contact = await Contact.findById(id)
  if (!contact) return null
  await contact.remove()
  return contact
}
