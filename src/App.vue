<template>
  <div id="app">
    <g-pagination></g-pagination>
  </div>
</template>

<script>

  import Pagination from './pagination/pagination'

export default {
  name: 'App',
  components: {
    'g-pagination': Pagination
  }
}
</script>

<style lang="scss">

</style>
