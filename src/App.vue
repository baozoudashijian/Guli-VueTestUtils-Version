<template>
  <div id="app">
    <g-pagination :total-page="10" :current-page.sync="currentPage"></g-pagination>
  </div>
</template>

<script>

  import Pagination from './pagination/pagination'

export default {
  name: 'App',
  data() {
    return {
      currentPage: 2
    }
  },
  components: {
    'g-pagination': Pagination
  }
}
</script>

<style lang="scss">

</style>
