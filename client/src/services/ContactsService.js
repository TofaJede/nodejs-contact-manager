import Api from '@/services/Api'

export const fetchContacts = () => {
  return Api().get('contacts')
}

export const addContact = (p) => {
  return Api().post('contacts', p)
}

export const updateContact = (p) => {
  return Api().put('contacts/' + p.id, p)
}

export const getContact = (p) => {
  return Api().get('contact/' + p.id)
}

export const deleteContact = (id) => {
  return Api().delete('contacts/' + id)
}
