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

let nAgt = navigator.userAgent
let browserName = navigator.appName
let fullVersion = '' + parseFloat(navigator.appVersion)
let majorVersion = parseInt(navigator.appVersion, 10)
let nameOffset, verOffset, ix

// In Opera, the true version is after "Opera" or after "Version"
if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
  browserName = 'Opera'
  fullVersion = nAgt.substring(verOffset + 6)
  if ((verOffset = nAgt.indexOf('Version')) !== -1) { fullVersion = nAgt.substring(verOffset + 8) }
// eslint-disable-next-line brace-style
}
// In MSIE, the true version is after "MSIE" in userAgent
else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
  browserName = 'Microsoft Internet Explorer'
  fullVersion = nAgt.substring(verOffset + 5)
// eslint-disable-next-line brace-style
}
// In Chrome, the true version is after "Chrome"
else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
  browserName = 'Chrome'
  fullVersion = nAgt.substring(verOffset + 7)
  // eslint-disable-next-line brace-style
}
// In Safari, the true version is after "Safari" or after "Version"
else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
  browserName = 'Safari'
  fullVersion = nAgt.substring(verOffset + 7)
  if ((verOffset = nAgt.indexOf('Version')) !== -1) { fullVersion = nAgt.substring(verOffset + 8) }
// eslint-disable-next-line brace-style
}
// In Firefox, the true version is after "Firefox"
else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
  browserName = 'Firefox'
  fullVersion = nAgt.substring(verOffset + 8)
  // eslint-disable-next-line brace-style
}
// In most other browsers, "name/version" is at the end of userAgent
else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
  (verOffset = nAgt.lastIndexOf('/'))) {
  browserName = nAgt.substring(nameOffset, verOffset)
  fullVersion = nAgt.substring(verOffset + 1)
  if (browserName.toLowerCase() === browserName.toUpperCase()) {
    browserName = navigator.appName
  }
}
// trim the fullVersion string at semicolon/space if present
if ((ix = fullVersion.indexOf(';')) !== -1) { fullVersion = fullVersion.substring(0, ix) }
if ((ix = fullVersion.indexOf(' ')) !== -1) { fullVersion = fullVersion.substring(0, ix) }

majorVersion = parseInt('' + fullVersion, 10)
if (isNaN(majorVersion)) {
  fullVersion = '' + parseFloat(navigator.appVersion)
  majorVersion = parseInt(navigator.appVersion, 10)
}

console.log(browserName)
console.log(majorVersion)

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
