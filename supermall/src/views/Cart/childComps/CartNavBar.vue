<template>
  <nav-bar class="nav-bar">
    <div slot="center">购物车({{length}})</div>
  </nav-bar>
</template>

<script>
import NavBar from "../../../components/common/navbar/NavBar";
import {mapGetters} from 'vuex'
export default {
  name: "CartNavBar",
  components: {
    NavBar,
  },
  computed : {
    ...mapGetters({
      length : 'cartLength',
    })
  }
};
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color :#FFF;
  }
</style>