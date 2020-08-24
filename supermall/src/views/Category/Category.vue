<template>
  <div id="category">
    <nav-bar class="nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <tab-control
      :titles="['综合','新品','销量']"
      @tabClick="tabClick"
      v-show="isShow"
      class="tab-control tab-control2"
      ref="tabControl1"
    ></tab-control>
    <div class="content">
      <tab-menu :categories="categories" @SelectItem="SelectItem"></tab-menu>
      <scroll
        id="tab-content"
        :data="[categoryData]"
        ref="scroll"
        :probe-type="3"
        @scroll="contentScroll"
      >
        <div>
          <tab-content-category :subcategories="showSubcategory" @imgLoad="imgLoad" />
          <tab-control :titles="['综合','新品','销量']" @tabClick="tabClick" ref="tabControl2"></tab-control>
          <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import Scroll from "../../components/common/BScroll/BScroll";
import TabControl from "../../components/content/tabControl/tabControl";
import GoodsList from "../../components/content/goods/GoodList";

import TabMenu from "./childComps/TabMenu";
import TabContentCategory from "./childComps/TabContentCategory";
import TabContentDetail from "./childComps/TabContentDetail";

import { POP, SELL, NEW, TOP_DISTANCE } from "common/const";
import { debounce } from "../../common/utils";
//导入获取数据的方法
import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";
export default {
  name: "Category",
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      currentType: "pop",
      isShow: false,
      tabOffsetTop: 0,
      saveY : 0,
    };
  },
  components: {
    NavBar,
    TabMenu,
    TabContentCategory,
    Scroll,
    TabControl,
    TabContentDetail,
  },
  created() {
    console.log(getCategory);
    // 1.请求分类数据
    this._getCategory();
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    },
  },
  methods: {
    //1、拿到所有的分类数据
    _getCategory() {
      getCategory().then((res) => {
        // 1)保存分类数据
        this.categories = res.data.category.list;
        // 2)初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0);
      });
    },

    //2、根据分类栏目的下标去请求相应的数据
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then((res) => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this._getCategoryDetail(POP);
        this._getCategoryDetail(SELL);
        this._getCategoryDetail(NEW);
      });
    },

    //3、根据类型请求相应的商品数据（pop，new，sell）
    _getCategoryDetail(type) {
      // 1)获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2)发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then((res) => {
        // 3)将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },

    //监听点击了哪个分类栏目
    SelectItem(index) {
      this._getSubcategories(index);
    },
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
    contentScroll(position) {
      this.isShow = -position.y >= this.tabOffsetTop;
    },
    imgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      console.log(this.tabOffsetTop);
    },
  },
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
  },
};
</script>

<style scoped>
#category {
  height: 100vh;
}

.nav {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
}

#tab-content {
  overflow: hidden;
  height: calc(100vh - 49px - 44px);
  flex: 1;
}

.tab-control2 {
  position: absolute;
  width: calc(100% - 101px);
  z-index: 3;
  right: 0;
  top: 43px;
}
</style>
