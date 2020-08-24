import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './components/common/Toast/main'
import VueLazyLoad from 'vue-lazyload';

Vue.config.productionTip = false

//自定义事件总线
Vue.prototype.bus = new Vue()

//安装我们自定义的插件
Vue.use(toast)

//安装图片懒加载
Vue.use(VueLazyLoad);

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
