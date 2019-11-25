<template>
  <div>
    <h1>Edit this contact</h1>
    <form v-on:submit.prevent="onSubmit">
      <div>
        <input type="text" name="name" placeholder="Name" v-model="name">
      </div>
      <div>
        <input type="text" name="surname" placeholder="Surname" v-model="surname">
      </div>
      <div>
        <input type="email" name="email" placeholder="Email" v-model="email">
      </div>
      <div>
        <input type="tel" name="phone" placeholder="Phone" v-model="phone">
      </div>
      <div>
        <input type="text" name="street" placeholder="Street" v-model="street">
      </div>
      <div>
        <input type="number" name="streetNum" placeholder="Street number" v-model="streetNum">
      </div>
      <div>
        <input type="text" name="city" placeholder="City" v-model="city">
      </div>
      <div>
        <button type="button" class="btn btn-primary" @click="updateContact">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import { getContact, updateContact } from '@/services'
export default {
  name: 'EditContact',
  data () {
    return {
      name: '',
      surname: '',
      email: '',
      phone: '',
      street: '',
      streetNum: '',
      city: ''
    }
  },
  mounted () {
    this.getContact()
  },
  methods: {
    async getContact () {
      const response = await getContact({
        id: this.$route.params.id
      })
      const { data } = response

      this.name = data.name
      this.surname = data.surname
      this.email = data.email
      this.phone = data.phone
      this.street = data.street
      this.streetNum = data.streetNum
      this.city = data.city
    },

    async updateContact () {
      await updateContact({
        id: this.$route.params.id,
        name: this.name,
        surname: this.surname,
        email: this.email,
        phone: this.phone,
        street: this.street,
        streetNum: this.streetNum,
        city: this.city
      })
      this.$router.push({ name: 'Contacts' })
    }
  }
}
</script>
