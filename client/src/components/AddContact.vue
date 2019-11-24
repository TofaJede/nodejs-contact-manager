<template>
  <div>
    <h1>Add new contact</h1>
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
        <button type="button" class="btn btn-primary" @click="addContact">Add new contact</button>
      </div>
    </form>
  </div>
</template>

<script>
import { addContact } from '@/services'
export default {
  name: 'AddContact',
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
  methods: {
    async addContact () {
      await
      addContact({
        name: this.name,
        surname: this.surname,
        email: this.email,
        phone: this.phone,
        street: this.street,
        streetNum: this.streetNum,
        city: this.city
      })
      this.$router.push({ name: 'Hello' })
    }
  }
}
</script>
