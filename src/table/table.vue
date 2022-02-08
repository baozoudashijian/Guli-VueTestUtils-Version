<template>
  <div class="g-table" :style="{height: height + 'px'}" ref="wrapper">
    <div class="g-table-modal" v-if="loading">
      <g-icon icon="loading"></g-icon>
    </div>
    <table :class="{bordered, stripe, 'small': size === 'small'}" ref="table">
      <thead>
        <tr>
          <th v-if="dispalySort"></th>
          <th v-if="checkBox"><input ref="selectAll" type="checkbox" @change="onChangeAllItem" :checked="inAllSelectItems"></th>
          <th v-for="column in columns">
            {{column.title}}
            <span class="g-table-sort" v-if="column.key in orderBy" @click="sortHandle(column.key, orderBy[column.key])">
              <g-icon icon="arrow-up" v-if="orderBy[column.key] === 'asc'"></g-icon>
              <g-icon icon="arrow-down" v-if="orderBy[column.key] === 'desc'"></g-icon>
              <g-icon icon="bupaixu" v-if="orderBy[column.key] === '-'"></g-icon>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dataSourceItem, index) in dataSource">
          <td v-if="dispalySort">{{index}}</td>
          <td v-if="checkBox"><input @change="onChangeItem(dataSourceItem, $event)" :checked="inSelectItems(dataSourceItem)" type="checkbox"></td>
          <td v-for="key in Object.keys(dataSourceItem).filter(item => item !== 'key')">{{dataSourceItem[key]}}</td>
        </tr>
      </tbody>
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
      },
      loading: {
        type: Boolean,
        default: false
      },
      height: {
        type: [String, Number],
        default: 400
      }
    },
    components: {
      'g-icon': Icon
    },
    mounted() {
      this.judgeCheckboxStatus(this.selectedItems)
      let tableCopy = this.$refs.table.cloneNode(true) // 这个table目前在内存中
      tableCopy.children[1].remove()
      console.log(tableCopy);
      this.$refs.wrapper.appendChild(tableCopy)
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
      sortHandle(key, sortRule) {
        // desc -> asc -> -
        let copy  = JSON.parse(JSON.stringify(this.orderBy))
        if(sortRule === 'desc') {
          copy[key] = 'asc'
        } else if (sortRule === '-') {
          copy[key] = 'desc'
        } else {
          copy[key] = '-'
        }
        // 更新orderBy
        this.$emit('update:orderBy', copy)
        // // 更新数据 排序只能根据一个属性排序 可以根据多个属性排序吗
        // this.$emit
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
  @import "../var"
  .g-table
    position: relative
    overflow: scroll
    &-modal
      position: absolute
      width: 100%
      height: 100%
      background-color: rgba(255, 255, 255, .8)
      display: flex
      justify-content: center
      align-items: center

      > svg
        width: 2em
        height: 2em
        @include spin
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