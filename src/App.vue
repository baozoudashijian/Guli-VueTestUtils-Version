<template>
  <div id="app">
    <g-table :dataSource="dataSource" :columns="columns" bordered />
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
        currentPage: 2,
        dataSource: [
          {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
          },
          {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
          },
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
        ]
      }
    },
    components: {
      'g-pagination': Pagination,
      'g-table': Table
    }
  }
</script>

<style lang="scss">

</style>
