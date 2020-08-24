import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters'
//1.挂载
Vue.use(Vuex);

//2. 创建store对象
const state = {
  cartList :[],
}
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  
})

//3.导出,然后挂载在vue实例上
export default store