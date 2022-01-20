<template>
  <div id="app">
    <g-pagination :total-page="10" :current-page="3"></g-pagination>
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
