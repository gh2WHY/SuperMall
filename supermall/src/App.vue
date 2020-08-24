<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar class="tabbar"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "./components/content/mainTabBar/mainTabBar";
export default {
  name: "app",
  components: {
    MainTabBar,
  },
};
</script>

<style scoped>
  @import 'assets/css/base.css';
  .tabbar {
    background-color: #fff;
  }
</style>
