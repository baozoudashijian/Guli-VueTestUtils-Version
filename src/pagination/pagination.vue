<template>
  <div class="g-pagination">
    <span class="g-pagination-item" :class="{dark: currentPage == 1}" @click="clickItem(currentPage - 1)" ><g-icon icon="arrow-left"></g-icon></span>
    <template v-for="n in paginationArr">
      <template v-if="n === currentPage">
        <span class="g-pagination-item active">{{n}}</span>
      </template>
      <template v-else-if="n == '•••'">
        <span class="g-pagination-item dot">{{n}}</span>
      </template>
      <template v-else>
        <span class="g-pagination-item" @click="clickItem(n)">{{n}}</span>
      </template>
    </template>
    <span class="g-pagination-item" :class="{dark: currentPage == totalPage}" @click="clickItem(currentPage + 1)"><g-icon icon="arrow-right"></g-icon></span>
  </div>
</template>

<script>
  import Icon from '../icon/icon'

  export default {
    name: "pagination",
    props: {
      totalPage: {
        type: [String, Number],
        required: true
      },
      currentPage: {
        type: [String, Number],
        required: true
      }
    },
    components: {
      'g-icon': Icon
    },
    computed: {
      paginationArr() {
        let page;
        switch (this.currentPage) {
          case 1:
            page = this.currentPage + 3
            break
          case 2:
            page = this.currentPage + 2
            break
          case 3:
            page = this.currentPage + 1
            break
          case this.totalPage:
            page = this.currentPage - 3
            break
          case this.totalPage - 1:
            page = this.currentPage - 2
            break
          case this.totalPage - 2:
            page = this.currentPage - 1
            break
          default:
            page = this.currentPage
        }

        const res = unique([1, page - 2, page - 1, page, page + 1, page + 2, this.totalPage]).filter(number => number > 0 && number < this.totalPage + 1).reduce((previousValue, currentValue, currentIndex, array) => {
          previousValue.push(array[currentIndex])
          if (array[currentIndex + 1] && array[currentIndex + 1] - array[currentIndex] > 1) {
            previousValue.push('•••')
          }
          return previousValue
        }, [])
        return res
      }
    },
    methods: {
      clickItem(n) {
        console.log(n)
        if (n >= 1 && n < this.totalPage + 1) {
          this.$emit('update:currentPage', n)
        }
      }
    }
  }

  function unique(arr) {
    let obj = {}
    arr.map((number) => {
      obj[number] = true
    })
    return Object.keys(obj).map((key) => parseInt(key))
  }
</script>

<style scoped lang="sass">
  @import "../var"

  .g-pagination
    display: flex
    align-items: center

    &-item
      display: inline-flex
      justify-content: center
      align-items: center
      min-width: 32px
      height: 32px
      margin-right: 8px
      border: 1px solid #d9d9d9
      border-radius: 2px
      font-size: 14px
      cursor: pointer

      &.active, &:hover
        border: 1px solid $primary
        color: $primary

      &.dot, &.dot:hover
        border: none
        color: #000
      &.dark
        fill: #999

      &:last-child
        margin-right: 0
</style>