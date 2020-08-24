<template>
  <div class="icon-selector" :class="{active : isChecked}" @click = 'clickBtn'>
    <img src="../../../assets/img/cart/tick.svg" alt />
  </div>
</template>

<script>
export default {
  name: "CartCheckBtn",
  props : {
    isChecked : {
      type : Boolean,
      default : false,
    }
  },
  methods : {
    clickBtn() {
      this.$emit('btnClick')
    }
  }
};
</script>

<style scoped>
.icon-selector {
  position: relative;
  margin: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ccc;
  cursor: pointer;
}

.icon-selector img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.active {
  background-color: #ff8198;
  border-color: #ff8198;
}
</style>