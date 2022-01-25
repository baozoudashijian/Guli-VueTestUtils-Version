<template>
  <div class="g-table">
    <table>
      <tr>
        <th v-for="column in columns">{{column.title}}</th>
      </tr>
      <tr v-for="dataSourceItem in dataSource">
        <td v-for="key in Object.keys(dataSourceItem).filter(item => item !== 'key')">{{key}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "table",
    props: {
      dataSource: {
        type: Array,
        required: true
      },
      columns: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped lang="sass">
  .g-table
    table
      /*display: block*/
      width: 100%
</style>