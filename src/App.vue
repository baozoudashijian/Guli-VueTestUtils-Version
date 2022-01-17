<template>
  <div id="app">
    <g-button type="danger">Primary</g-button>
  </div>
</template>

<script>
import Button from './button/button.vue'

export default {
  name: 'App',
  components: {
    'g-button': Button
  }
}
</script>

<style lang="scss">

</style>
