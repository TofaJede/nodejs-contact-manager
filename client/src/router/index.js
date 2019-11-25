import Vue from 'vue'
import Router from 'vue-router'
import Contacts from '../components/Contacts'
import AddContact from '@/components/AddContact'
import EditContact from '@/components/EditContact'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Contacts',
      component: Contacts
    },
    {
      path: '/contact/add',
      name: 'AddContact',
      component: AddContact
    },
    {
      path: '/contact/edit',
      name: 'EditContact',
      component: EditContact
    }
  ]
})
