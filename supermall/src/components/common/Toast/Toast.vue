<template>
  <div class="toast" v-show="isShow">{{message}}</div>
</template>

<script>
export default {
  name: "Toast",
  // props : {
  //   isShow : {
  //     type : Boolean,
  //     default : false,
  //   },
  //   message: {
  //     type : String,
  //     default() {
  //       return '';
  //     }
  //   },
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    app() {
      console.log(111);
    },
    // //直接调用此方法即可显示提示信息
    showToast(message, duration = 500) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 999;
  width: 200px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: white;
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>