<template>
  <div>
    <h1>Add new contact</h1>
    <ContactForm buttonText="Add new contact" :clickAction="addContact" v-model="formData" />
  </div>
</template>

<script>
import { addContact } from '@/services'
import ContactForm from './Form'
export default {
  name: 'AddContact',
  components: {ContactForm},
  data () {
    return {
      formData: {
        name: '',
        surname: '',
        email: '',
        phone: '',
        street: '',
        streetNum: '',
        city: ''
      }
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
      this.$router.push({ name: 'Contacts' })
    }
  }
}
</script>

<style>
  form {
    margin: 0 auto;
    width:80%
  }
</style>
