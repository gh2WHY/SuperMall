<template>
  <div class="cart-list">
    <cart-list-item v-for="(item,index) in cartList" :key="index" :item = 'item'></cart-list-item>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartListItem from "./cartListItem";

export default {
  name: "cartList",
  components: {
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList", "cartLength"]),
  },
};
</script>

<style scoped>
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>