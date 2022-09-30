import Vue from 'vue'

//全部引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'
import router from './router'

//引入字体
import './iconfont/iconfont.css'

//引入图片懒加载的包和图片
import VueLazyload from 'vue-lazyload';
import myPicture from '@/assets/default.png'

Vue.config.productionTip = false

Vue.use(ElementUI)
//实现图片懒加载
Vue.use(VueLazyload,{
  loading:myPicture
})


new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this
  },
  router
}).$mount('#app')
