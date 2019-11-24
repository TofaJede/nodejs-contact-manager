import Vue from 'vue'
import Router from 'vue-router'
import Posts from '@/components/Posts'
import NewPost from '@/components/NewPost'
import EditPost from '@/components/EditPost'
import Contacts from '../components/Contacts'
import Hello from '@/views/Hello'
import AddContact from '@/components/AddContact'
import EditContact from '@/components/EditContact'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/posts/new',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/posts/:id',
      name: 'EditPost',
      component: EditPost
    },
    {
      path: '/contacts',
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
