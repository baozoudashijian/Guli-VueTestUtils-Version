<template>
  <div id="app">
    <g-table :loading="loading" :dataSource="dataSource" :columns="columns" :selected-items.sync="selected" bordered  stripe check-box :order-by.sync="orderBy" @update:orderBy="updateSortBy" />
    <g-pagination :total-page="10" :current-page.sync="currentPage"></g-pagination>
  </div>
</template>

<script>

  import Pagination from './pagination/pagination'
  import Table from './table/table'

  export default {
    name: 'App',
    data() {
      return {
        loading: false,
        currentPage: 2,
        selected: [
          {
            key: '1',
            name: '胡彦斌',
            age: 22,
            address: '西湖区湖底公园1号',
          }
        ],
        dataSource: [
          {
            key: '1',
            name: '胡彦斌',
            age: 52,
            address: '西湖区湖底公园1号',
          },
          {
            key: '2',
            name: '胡彦祖',
            age: 12,
            address: '西湖区湖底公园1号',
          },
          {
            key: '3',
            name: '胡彦祖',
            age: 102,
            address: '西湖区湖底公园1号',
          },
          {
            key: '4',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          }
        ],
        columns: [
          {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
          },
          {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
          },
        ],
        orderBy: {
          age: 'desc'
        }
      }
    },
    components: {
      'g-pagination': Pagination,
      'g-table': Table
    },
    methods: {
      updateSortBy() {
        this.loading = true
        setTimeout(() => {
          // this.dataSource.sort((a, b) => a.age - b.age) 这个和下面的有什么区别
          this.dataSource = this.dataSource.sort((a, b) => a.age - b.age)
          this.loading = false
        }, 2000)
      }
    }
  }
</script>

<style lang="scss">

</style>
