<template>
  <div id="app">
    <router-view/>
    <alert v-show="isAlertVisible" @close="closeAlert"/>
  </div>
</template>

<script>
import alert from './components/alert'

export default {
  name: 'App',
  components: {
    alert
  },
  data () {
    return {
      isAlertVisible: true
    }
  },
  methods: {
    showAlert () {
      this.isAlertVisible = true
    },
    closeAlert () {
      this.isAlertVisible = false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
