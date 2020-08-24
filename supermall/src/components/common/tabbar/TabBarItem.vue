<template>
  <div class="tab-bar-item" @click="clickItem">
    <div  v-if = '!isActive'><slot  name = "item-icon"></slot></div>
    <div  v-else ><slot name="item-icon-active"></slot></div>
    <div :style = 'activeStyle'><slot name = "item-content"></slot></div>
   
  </div>
</template>

<script>
  export default {
    name : 'TabBarItem',
    props : {
      path : String,
      activeColor: {
        type: String,
        // default: 'red'
      }
    },
    data() {
      return {
        // isActive : true,
      }
    },
    methods : {
      clickItem() {
        this.$router.push(this.path)
      }
    },
    computed : {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    }
  };
</script>

<style>
  .tab-bar > .tab-bar-item {
    flex: 1;
    text-align: center;
  }
  .tab-bar  .tab-bar-item  img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>