<template>
  <div class="normal-list">
    <div v-for="(item, index) in listData" :key="index" class="item">
      <img :src="iconURL(item)" alt />
      <div class="info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NormalListView",
  props: {
    listData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    iconURL(item) {
      return require("assets/img/profile/" + item.icon);
    },
  },
};
</script>

<style scoped>
  .normal-list {
    background-color: #fff;
    font-size: 15px;
    color: #333;
    margin-top: 15px;
  }

  .normal-list .item {
      height: 44px;
    line-height: 44px;
    position: relative;
  }

  .normal-list img {
    width: 20px;
    height: 20px;
    margin-top: 10px;
    position: absolute;
    left: 16px;
    top: 2px;
  } 

  .normal-list .info {
    margin-left: 40px;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    padding-left: 5px;
  }

    .item:last-of-type .info {
    border-bottom: none;
  }
</style>