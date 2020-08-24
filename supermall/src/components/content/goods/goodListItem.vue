<template>
  <div class="goods-list-item" @click = 'toDetails'>
    <img v-lazy="showImg" @load = 'imageOnload' />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed : {
    showImg() {
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    //1.正常发射事件,在离开首页或者详情页的时候取消事件绑定
    imageOnload() {
      this.bus.$emit('itemImageOnload')
    },

    //2.可以通过路由判断,发射出去不同的事件
    // imageOnload() {
    //   if(this.$route.path.indexOf('/home')){
    //     this.bus.$emit('HomeImgLoad');
    //   }else if(this.$route.path.indexOf('/detail')) {
    //     this.bus.$emit('DetailImgLoad');
    //   }
    // },
    toDetails() {
      this.$router.push('./detail/' + this.goodsItem.iid)
    }
  }
};
</script>

<style scoped>
 
  .goods-list-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-list-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>