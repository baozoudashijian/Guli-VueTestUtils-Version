<template>
  <div class="g-pagination">
    {{paginationArr}}
  </div>
</template>

<script>
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
    data() {
      const res = unique([1, this.currentPage - 2, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.currentPage + 2, this.totalPage]).filter(number => number > 0).reduce((previousValue, currentValue, currentIndex, array) => {
        console.log(array[currentIndex + 1], array[currentIndex])
        previousValue.push(array[currentIndex])
        if(array[currentIndex + 1] && array[currentIndex + 1] - array[currentIndex] > 1) {
          previousValue.push('•••')
        }
        return previousValue
      }, []).join(' ')


      return {
        paginationArr: res
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

</style>