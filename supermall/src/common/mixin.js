import {debounce} from './utils'

export const ImgListener = {
  data() {
    return {
      itemImgListener : null,
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImgListener = ()=>{
      refresh();
    }
    this.bus.$on("itemImageOnload",this.itemImgListener);
    // this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
  },
}

import BackTop from '../components/content/backTop/backTop.vue'
