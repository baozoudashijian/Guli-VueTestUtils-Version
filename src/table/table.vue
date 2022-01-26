<template>
  <div class="g-table">
    <div>{{selectedItems}}</div>
    <table :class="{bordered, stripe, 'small': size === 'small'}">
      <tr>
        <th v-if="dispalySort"></th>
        <th v-if="checkBox"><input type="checkbox" @change="onChangeAllItem" :checked="inAllSelectItems"></th>
        <th v-for="column in columns">{{column.title}}</th>
      </tr>
      <tr v-for="(dataSourceItem, index) in dataSource">
        <td v-if="dispalySort">{{index}}</td>
        <td v-if="checkBox"><input @change="onChangeItem(dataSourceItem, $event)" :checked="inSelectItems(dataSourceItem)" type="checkbox"></td>
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
      },
      stripe: {
        type: Boolean,
        default: false
      },
      size: {
        type: String
      },
      checkBox: {
        type: Boolean,
        default: false
      },
      selectedItems: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      inAllSelectItems() {
        console.log(this.selectedItems.length === this.dataSource.length);
        return this.selectedItems.length === this.dataSource.length
      }
    },
    methods: {
      onChangeItem(item, e) {
        let selected = e.target.checked
        let copy = JSON.parse(JSON.stringify(this.selectedItems))
        if(selected) {
          copy.push(item)
        } else {
          copy = copy.filter(i => i.key !== item.key)
        }
        this.$emit('update:selectedItems', copy)
      },
      onChangeAllItem(e) {
        let selected = e.target.checked
        let copy = JSON.parse(JSON.stringify(this.dataSource))

        if(selected) {
          this.$emit('update:selectedItems', copy)
        } else {
          this.$emit('update:selectedItems', [])
        }

      },
      inSelectItems(item) {
        return this.selectedItems.filter(i => i.key === item.key).length > 0
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
        &:hover
          background-color: #f5f7fa

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
      &.stripe

        > tr
          &:nth-child(2n-1)
            background-color: #fafafa
          &:hover
            background-color: #f5f7fa
      &.small
        > tr
          > th
            padding: 8px

          > td
            padding: 8px

</style>