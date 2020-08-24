<template>
  <div class="cart">
    <cart-nav-bar></cart-nav-bar>
    <scroll class="scroll" ref = 'scroll'>
      <cart-list></cart-list>
    </scroll>
    <bottom-bar class="bottom-bar"></bottom-bar>
  </div>
</template>

<script>
import CartNavBar from './childComps/CartNavBar'
import CartList from './childComps/cartList'
import BottomBar from './childComps/BottomBar'

import Scroll from '../../components/common/BScroll/BScroll'
export default {
  name :'Cart',
  components : {
    CartNavBar,
    CartList,
    Scroll,
    BottomBar,
  },
  methods : {
    activated () {
      this.$refs.scroll.refresh();
    }
  }
}
</script>

<style scoped>
  .cart {
    position: relative;
    height: 100vh;
    background-color: #fff;
  }

  .scroll {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
    overflow: hidden;
  }


</style>