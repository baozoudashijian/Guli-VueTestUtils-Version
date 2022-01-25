<template>
  <div class="g-table">
    <table :class="{bordered}">
      <tr>
        <th v-if="dispalySort"></th>
        <th v-for="column in columns">{{column.title}}</th>
      </tr>
      <tr v-for="(dataSourceItem, index) in dataSource">
        <td v-if="dispalySort">{{index}}</td>
        <td v-for="key in Object.keys(dataSourceItem).filter(item => item !== 'key')">{{dataSourceItem[key]}}</td>
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
      },
      dispalySort: {
        type: Boolean,
        default: false
      },
      bordered: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="sass">
  .g-table
    table
      /*display: block*/
      border-collapse: collapse
      width: 100%

      tr
        text-align: left
        font-size: 14px

        th
          padding: 16px
          font-weight: 500
          background-color: #fafafa
          border-bottom: 1px solid #f0f0f0

        td
          padding: 16px
          border-bottom: 1px solid #f0f0f0

      &.bordered
        > tr

          > th
            border-right: 1px solid #f0f0f0
            &:nth-child(1)
              border-left: 1px solid #f0f0f0

          > td
            border-right: 1px solid #f0f0f0
            &:nth-child(1)
              border-left: 1px solid #f0f0f0

</style>