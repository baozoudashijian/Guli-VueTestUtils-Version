<template>
  <div id="app">
    <g-table
            :loading="loading"
            :dataSource="dataSource"
            :columns="columns"
            :selected-items.sync="selected"
            bordered
            stripe
            check-box
            dispaly-sort
            :order-by.sync="orderBy"
            @update:orderBy="updateSortBy"
            :height="400"
            expanded-key="description"
            dispalyExpanded
    >
      <template slot-scope="props">
        <g-button type="primary">{{props}}</g-button>
        <g-button type="error">删除</g-button>
      </template>
    </g-table>
    <g-pagination :total-page="10" :current-page.sync="currentPage"></g-pagination>
  </div>
</template>

<script>

  import Pagination from './pagination/pagination'
  import Table from './table/table'
  import Button from './button/button'

  export default {
    name: 'App',
    data: function () {
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
            description: '雄关漫道真如铁，而今迈步重头越'
          },
          {
            key: '2',
            name: '胡彦祖',
            age: 12,
            address: '西湖区湖底公园1号',
            description: '雄关漫道真如铁，而今迈步重头越'
          },
          {
            key: '3',
            name: '胡彦祖',
            age: 102,
            address: '西湖区湖底公园1号',
            description: '雄关漫道真如铁，而今迈步重头越'
          },
          {
            key: '4',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
            description: '雄关漫道真如铁，而今迈步重头越'
          },
          {
            key: '5',
            name: '胡彦祖',
            age: 12,
            address: '西湖区湖底公园1号',
            description: '雄关漫道真如铁，而今迈步重头越'
          },
          {
            key: '6',
            name: '胡彦祖',
            age: 102,
            address: '西湖区湖底公园1号',
            description: '雄关漫道真如铁，而今迈步重头越'
          },
          {
            key: '7',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
            description: '雄关漫道真如铁，而今迈步重头越'
          },
          {
            key: '8',
            name: '胡彦祖',
            age: 12,
            address: '西湖区湖底公园1号',
            description: '雄关漫道真如铁，而今迈步重头越'
          },
          {
            key: '9',
            name: '胡彦祖',
            age: 102,
            address: '西湖区湖底公园1号',
            description: '雄关漫道真如铁，而今迈步重头越'
          },
          {
            key: '10',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
            description: '雄关漫道真如铁，而今迈步重头越'
          },
          {
            key: '11',
            name: '胡彦斌',
            age: 52,
            address: '西湖区湖底公园1号',
            description: '雄关漫道真如铁，而今迈步重头越'
          },
          {
            key: '12',
            name: '胡彦祖',
            age: 12,
            address: '西湖区湖底公园1号',
            description: '雄关漫道真如铁，而今迈步重头越'
          },
          {
            key: '13',
            name: '胡彦祖',
            age: 102,
            address: '西湖区湖底公园1号',
            description: '雄关漫道真如铁，而今迈步重头越'
          },
          {
            key: '14',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
            description: '雄关漫道真如铁，而今迈步重头越'
          },
          {
            key: '15',
            name: '胡彦祖',
            age: 12,
            address: '西湖区湖底公园1号',
            description: '雄关漫道真如铁，而今迈步重头越'
          },
          {
            key: '16',
            name: '胡彦祖',
            age: 102,
            address: '西湖区湖底公园1号',
            description: '雄关漫道真如铁，而今迈步重头越'
          },
          {
            key: '17',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
            description: '雄关漫道真如铁，而今迈步重头越'
          },
          {
            key: '18',
            name: '胡彦祖',
            age: 12,
            address: '西湖区湖底公园1号',
            description: '雄关漫道真如铁，而今迈步重头越'
          },
          {
            key: '19',
            name: '胡彦祖',
            age: 102,
            address: '西湖区湖底公园1号',
            description: '雄关漫道真如铁，而今迈步重头越'
          },
          {
            key: '20',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
            description: '雄关漫道真如铁，而今迈步重头越'
          }
        ],
        columns: [
          {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            width: 100
          },
          {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            width: 150
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
      'g-table': Table,
      'g-button': Button
    },
    methods: {
      updateSortBy() {
        this.loading = true
        setTimeout(() => {
          // Todo
          /*
          * {age, desc} 如何给后端发送排序的属性和排序规则
          * */
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
