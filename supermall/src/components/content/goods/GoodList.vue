<template>
  <div class="good-list">
    <goods-list-item v-for = '(item,index) in goods' :key = 'index' :goods-item = 'item' ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './goodListItem'
export default {
  name : 'GoodList',
  props : {
    goods : {
      type : Array,
      default() {
        return [];
      }
    }
  },
  components : {
    GoodsListItem,
  },
}
</script>

<style scoped>
  .good-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>