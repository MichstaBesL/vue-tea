import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//公共css
import "@/assets/css/common.css"
import "@/assets/css/iconfont.css"

import Mint from 'mint-ui'; 
import 'mint-ui/lib/style.css'
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);
Vue.use(Mint) 

import Vuex from 'vuex'
Vue.use(Vuex)

import LyTab from 'ly-tab';

Vue.use(LyTab);

//vant 组件
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
