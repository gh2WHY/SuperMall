<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @tabClick="contentScroll" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="srcoll" :probeType="3">
      <!-- <div>{{$store.state.cartList}}</div> -->
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-params-info ref="params" :paramInfo="paramInfo"></detail-params-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <good-item ref="recommend" :goods="recommendlist"></good-item>
    </scroll>
    <toast :isShow="isShow" :message="message" ref = 'toast'></toast>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "../../components/common/BScroll/BScroll";
import GoodItem from "../../components/content/goods/GoodList";
import BackTop from "../../components/content/backTop/backTop";
import Toast from "../../components/common/Toast/Toast";

import { ImgListener, BackToTop } from "../../common/mixin";
import { debounce } from "../../common/utils";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "../../network/details.js";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendlist: [],
      themeTop: [],
      currentIndex: 0,
      isShowBackTop: false,
      //定义关于toast中的变量
      isShow: false,
      message: "",
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodItem,
    DetailBottomBar,
    BackTop,
    Toast,
  },
  mixins: [ImgListener],
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      console.log(res);
      let data = res.result;
      //1.获取轮播图相关数据
      this.topImages = data.itemInfo.topImages;
      //2. 获取商品描述信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3. 获取店铺相关信息
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //5. 获取商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //6. 请求评论信息
      if (data.rate) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //3. 获取推荐数据
    getRecommend().then((res) => {
      this.recommendlist = res.data.list;
    });
  },
  destroyed() {
    this.bus.$off("itemImageOnload", ImgListener);
  },
  // mounted() {
  //   this.themeTop.push(0);
  //   this.themeTop.push(this.$refs.params.$el.offsetTop);
  //   this.themeTop.push(this.$refs.comment.$el.offsetTop);
  //   this.themeTop.push(this.$refs.recommend.$el.offsetTop);
  // },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.themeTop.push(0);
      this.themeTop.push(this.$refs.params.$el.offsetTop);
      this.themeTop.push(this.$refs.comment.$el.offsetTop);
      this.themeTop.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTop);
    },

    contentScroll(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTop[index], 500);
    },

    srcoll(position) {
      this.isShowBackTop = -position.y > 1000;
      // position和数组中的数组对比,然后判断在哪个位置
      let py = -position.y;
      let length = this.themeTop.length;
      for (let i in this.themeTop) {
        //这里的i是字符串,需要处理为数字
        i = parseInt(i);
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            py >= this.themeTop[i] &&
            py < this.themeTop[i + 1]) ||
            (i === length - 1 && py >= this.themeTop[i]))
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
          // console.log(this.currentIndex);
        }
      }
    },
    backTop() {
      // console.log(this.$refs.scroll);
      this.$refs.scroll.scrollTo(0, 0, 500);
    },

    //加入购物车
    addToCart() {
      // 1.创建对象
      const product = {};
      // 2.对象信息
      product.iid = this.iid;
      product.imgURL = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.lowPrice = this.goods.lowPrice;
      // this.$store.commit('addToCart',product);
      this.$store.dispatch("addToCart", product).then(res => {
        console.log(res);
        console.log(this.$toast);
        // console.log(this.refs.toast);
        this.$toast.showToast(res, 800);
      })
      // this.$store.dispatch("addToCart", product).then((res) => {
      //   //修改是否显示和设置显示的内容,从actions.js中接收到
      //   this.isShow = true;
      //   this.message = res;
      //   //信息展示1s之后消失
      //   setTimeout(() => {
      //     (this.isShow = false), (this.message = "");
      //   }, 1000);
      // });
    },
  },

  mounted() {
    // console.log(ImgListener);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 11;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 11;
  background-color: #fff;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  overflow: hidden;
  background-color: #fff;
}
</style>