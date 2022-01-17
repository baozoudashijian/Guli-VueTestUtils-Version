<template>
  <svg class="g-icon">
    <use :xlink:href="getIcon"></use>
  </svg>
</template>

<script>
  import '../svg'
  export default {
    name: "icon",
    props: {
      icon: {
        type: String
      }
    },
    computed: {
      getIcon() {
        return `#icon-${this.icon}`
      }
    },
    created() {
      console.log(`#icon-${this.icon}`, 'created')
    },
    mounted() {
      console.log(`#icon-${this.icon}`, 'mounted')
    }
  }
</script>

<style scoped lang="sass">
  .g-icon
    width: 1em
    height: 1em
</style>