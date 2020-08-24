<template>
  <div class="bottom-bar">
    <cart-check-btn 
        class = 'select-all' 
        :is-checked = 'isSelectAll'
        @click.native = 'BtnClick'
        ></cart-check-btn>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click = 'toPay'>去计算({{checkedLength}})</span>
  </div>
</template>

<script>
  import CartCheckBtn from './CartCheckBtn';
  import {mapGetters} from 'vuex';
  export default {
    name : 'BottomBar',
    components : {
      CartCheckBtn,
    },
    computed : {
      ...mapGetters(['cartList']),
      totalPrice() {
        return this.cartList.filter(item => {
          return item.checked;
        }).reduce((preVaule,item) => {
          return preVaule + item.count * item.lowPrice;
        },0).toFixed(2);
      },
      checkedLength() {
        return this.$store.state.cartList.filter(item => {
          return item.checked;
        }).length;
      },

      isSelectAll() {
        //循环数组,查找里面的checked,如果找到一个,马上返回false,全选按钮高亮消失
        //如果循环完整个数组也没有发现checked为false,则返回true,全选按钮高亮显示
        if(this.$store.state.cartList.length === 0) {
          return false;
        }
        for(let item of this.$store.state.cartList) {
          if(!item.checked) {
            return false;
          }
        }
        return true;
      }
    },
    methods : {
      BtnClick() {
        if(this.isSelectAll) {
          //如果上面全部选中了,则点击一下,取消全选
          //循环数组,修改item.checked的值为false
          this.$store.state.cartList.forEach(item => {
            item.checked = false;
          });
        }else {
          //原来全部都是不选中或者部分选中,则点击变为全选
          //循环数组,修改item.checked的值为ture
          this.$store.state.cartList.forEach(item => {
            item.checked = true;
          })
        }
      },
      toPay() {
        if(this.$store.state.cartList.length=== 0) {
          this.$toast.showToast('请添加商品',1500);
        }else{
          this.$toast.showToast('结算选中商品',1500);
        }
        
      }


    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: fixed;
    left : 0;
    right : 0;
    bottom : 49px;
    width: 100vh;
    height: 44px;
    background-color: #eee;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 16px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .select-all {
    display: inline-block;
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .total-price {
    padding-left : 30px;
  }

  .buy-product {
    /* float: right; */
    position: fixed;
    right : 0px;
    bottom :50px;
    display: inline-block;
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
  }
</style>