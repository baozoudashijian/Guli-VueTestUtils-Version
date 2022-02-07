<template>
  <div class="g-table">
    <div>{{selectedItems}}</div>
    <table :class="{bordered, stripe, 'small': size === 'small'}">
      <tr>
        <th v-if="dispalySort"></th>
        <th v-if="checkBox"><input ref="selectAll" type="checkbox" @change="onChangeAllItem" :checked="inAllSelectItems"></th>
        <th v-for="column in columns">
          {{column.title}}
          <span class="g-table-sort" v-if="column.key in orderBy" @click="sortHandle">
            <g-icon icon="arrow-down" ></g-icon>
            <g-icon icon="arrow-up" ></g-icon>
          </span>
        </th>
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

  import Icon from '../icon/icon'

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
      },
      orderBy: {
        type: Object,
        default: () => ({})
      }
    },
    components: {
      'g-icon': Icon
    },
    mounted() {
      this.judgeCheckboxStatus(this.selectedItems)
    },
    computed: {
      inAllSelectItems() {
        // 这样判断有问题
        if(!(this.selectedItems.length === this.dataSource.length)) {
          return false
        }
        let flag
        let arrselectedItems = this.selectedItems.map(item => item.key).sort((a,b) => a - b)
        let arrdataSource = this.dataSource.map(item => item.key).sort((a,b) => a - b)
        for(let i=0; i<arrdataSource.length; i++) {
          if(!(arrdataSource[i] === arrselectedItems[i])) {
            flag = false
            break
          }else{
            flag = true
          }
        }
        return flag
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
      },
      judgeCheckboxStatus(nextVal) {
        if(nextVal.length === 0 || nextVal.length === this.dataSource.length) {
          this.$refs.selectAll.indeterminate = false
        } else {
          this.$refs.selectAll.indeterminate = true
        }
      },
      sortHandle() {
        console.log(123)
      }
    },
    watch: {
      selectedItems(nextVal) {
        this.judgeCheckboxStatus(nextVal)
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