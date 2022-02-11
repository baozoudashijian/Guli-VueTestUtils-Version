<template>
  <div id="app">
    <g-upload>

    </g-upload>
  </div>
</template>

<script>

  import Upload from './upload/upload'

  export default {
    name: 'App',
    data() {
      return {}
    },
    components: {
      'g-upload': Upload
    },
    methods: {

    }
  }
</script>

<style lang="scss">

</style>
