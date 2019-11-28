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
  const res = Api().get('contact/' + p.id)
  // TODO: How to handle status 500????
  // if res.status === 500 => res.data.error = true
  // console.log(res)
  return res
}

export const deleteContact = (id) => {
  return Api().delete('contacts/' + id)
}
