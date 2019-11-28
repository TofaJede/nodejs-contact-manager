<template>
  <form v-on:submit.prevent="onSubmit" class="col-md-6 justify-content-center">
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="John" class="form-control" v-model="name">
      </div>
      <div class="form-group col-md-6">
        <label for="surname">Surname:</label>
        <input type="text" id="surname" name="surname" placeholder="Doe" class="form-control" v-model="surname">
      </div>
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email"
             pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
             id="email" name="email" placeholder="john.doe@email.com" class="form-control" v-model="email">
      <!-- Y U NO WORKING -->
    </div>
    <div class="form-group">
      <label for="phone">Phone:</label>
      <input type="tel"
             pattern="([+]?\d{1,3}[. \s]?)?(\d{9}?)"
             id="phone" name="phone" placeholder="+420 123123123" class="form-control" v-model="phone">
    </div>
    <div class="form-row">
      <div class="form-group col-md-8">
        <label for="street">Street:</label>
        <input type="text" id="street" name="street" placeholder="Streetname" class="form-control" v-model="street">
      </div>
      <div class="form-group col-md-4">
        <label for="streetNum">Street number:</label>
        <input type="number" id="streetNum" name="streetNum" placeholder="1" class="form-control" v-model="streetNum">
      </div>
    </div>
    <div class="form-group">
      <label for="city">City:</label>
      <input type="text" id="city" name="city" placeholder="Brno" class="form-control" v-model="city">
    </div>
    <div class="form-group">
      <button type="button" class="btn btn-primary" @click="clickAction">{{ buttonText }}</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ContactForm',
  props: {
    buttonText: String,
    clickAction: {type: Function}
  }
}
</script>
