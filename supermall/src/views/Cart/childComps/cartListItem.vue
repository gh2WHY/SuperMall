<template>
  <div class="cart-list-item">
      <div class="item-selector">
      <cart-check-btn :is-checked = 'item.checked' @btnClick = 'btnClcik'></cart-check-btn>
    </div>
    <div class="item-img">
      <img :src = "item.imgURL" alt="商品图片">
    </div>

    <div class="item-info">
      <div class="item-title">{{item.title}}</div>
      <div class="item-desc">商品描述: {{item.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{item.lowPrice}}</div>
        <div class="item-count right">x{{item.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CartCheckBtn from './CartCheckBtn'
export default {
  name : 'CartListItem',
  props : {
    item : {
      type : Object,
      default() {
        return {};
      }
    }
  },
  components : {
    CartCheckBtn,
  },
  methods : {
    btnClcik() {
      console.log(111);
      this.item.checked = !this.item.checked;
    }
  }
}
</script>

<style scoped>
    .cart-list-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
</style>