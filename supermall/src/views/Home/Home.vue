<template>
  <div id="home">
    <nav-bar class="home-nav">
      <slot slot="center">购物街</slot>
    </nav-bar>
    <tab-control
      class="tab-control"
      :titles=" ['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      :probo-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
      ref="scroll"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommend :recommends="recommends"></home-recommend>
      <feature-view></feature-view>
      <tab-control
        class="tab-control"
        :titles=" ['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import TabControl from "../../components/content/tabControl/tabControl";
import GoodsList from "../../components/content/goods/GoodList";
import Scroll from "../../components/common/BScroll/BScroll";
import BackTop from "../../components/content/backTop/backTop";

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";
import FeatureView from "./childComps/featureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "../../common/utils";
import {ImgListener} from '../../common/mixin';

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY : 0,
    };
  },
  mixins : [ImgListener],
  created() {
    //获取首页轮播和推荐数据
    this.getHomeMultidata();

    //获取详情数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  //活跃的时候返回该位置
  activated() {
     //一进入组件就滚动到离开时保存的位置
      this.$refs.scroll && this.$refs.scroll.scrollTo(0, this.saveY, 10);
      //refresh():重新计算 better-scroll,
      this.$refs.scroll && this.$refs.scroll.refresh();
  },
  //离开时保存一个位置
  deactivated() {
    //1. 保存离开时的位置
    this.saveY = this.$refs.scroll.scroll.y;
    // console.log('home ',this.saveY);

    //2. 取消全局事件绑定
    this.bus.$off('itemImageOnload',ImgListener)
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backTop() {
      console.log(this.$refs.scroll);
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;
      this.isTabFixed = -position.y >= this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    //网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },

    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
.title {
  color: orange;
}

#home {
  height: 100vh;
  padding-top: 44px;
}

.home-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: var(--color-tint);
  color: #fff;
}

.tab-control {
  z-index: 3;
  position: sticky;
  top: 44px;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}

/* .fixed {
    position: fixed;
    top : 44px;
    left : 0;
    right : 0;

  } */
</style>