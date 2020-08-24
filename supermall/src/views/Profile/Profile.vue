<template>
  <div id="profile">
    <nav-bar class="nav">
      <div slot="center">个人中心</div>
    </nav-bar>
    <user-info></user-info>
    <relative-info></relative-info>
    <list-data :listData = 'orderList'></list-data>
    <list-data :listData = 'serviceList'></list-data>
  </div>
</template>

<script>
import UserInfo from "./childComps/UserInfo";
import RelativeInfo from "./childComps/AccountInfo";
import ListData from './childComps/SomeList'

import NavBar from "../../components/common/navbar/NavBar";
export default {
  name: "AccountInfo",
  data() {
    return {
      orderList: [
        { icon: "message.svg", info: "我的消息" },
        { icon: "pointer.svg", info: "积分商城" },
        { icon: "vip.svg", info: "会员卡" },
      ],
      serviceList: [
        { icon: "cart.svg", info: "我的购物车" },
        { icon: "shopping.svg", info: "下载购物APP" },
      ],
    };
  },
  components: {
    NavBar,
    UserInfo,
    RelativeInfo,
    ListData,
  },
};
</script>

<style scoped>
  #profile {
    background: #f2f2f2;
  }

  .nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>