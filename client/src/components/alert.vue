<template>
  <div class="modal-backdrop">
    <div class="modal" role="dialog">
      <section class="modal-body">
        <p>Asi pouzivas napicu prohlizec...</p>
        <button
          type="button"
          class="btn-green"
          @click="close"
        >
          Zavřít
        </button>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'alert',
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
  .modal-backdrop {
    position: relative;
    width: 200px;
    background-color: crimson;
  }
  .modal {
    color: black;
    text-align: center;
    display: block;
    background-color: white;
    padding-bottom: 10px;

  }
  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

</style>
