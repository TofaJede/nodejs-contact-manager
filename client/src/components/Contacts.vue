<template>
  <div class="contacts">
    <h1 v-if="contacts.length == 0" > This page will list all contacts.</h1>
    <h1 v-if="contacts.length" > Contacts</h1>
    <router-link v-bind:to="{ name: 'AddContact' }" class="add_post_link">Add contact</router-link>
    <table class="table">
      <thead class="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Surname</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Street</th>
          <th scope="col">Street number</th>
          <th scope="col">City</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(contact, key) in contacts"
          :key="key"
        >
          <td>{{ key + 1 }}</td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.surname }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.phone }}</td>
          <td>{{ contact.street }}</td>
          <td>{{ contact.streetNum }}</td>
          <td>{{ contact.city }}</td>
          <td>
            <router-link v-bind:to="{ name: 'EditContact', params: { id: contact._id } }">Edit</router-link> |
            <a href="#" @click="deleteContact(contact._id)">Delete</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { fetchContacts, deleteContact } from '@/services'

export default {

  name: 'contacts',
  data () {
    return {
      contacts: []
    }
  },
  mounted () {
    this.getContacts()
  },
  methods: {
    async getContacts () {
      const response = await fetchContacts()
      this.contacts = response.data.contacts
    },
    async deleteContact (id) {
      await deleteContact(id)
      this.getContacts()
    }
  }
}
</script>
