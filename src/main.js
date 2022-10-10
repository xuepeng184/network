import Vue from 'vue'

//按需引入element-ui
import {Menu,Table, Pagination, Carousel,Input,MenuItem,CarouselItem,TableColumn} from 'element-ui';
Vue.use(Menu)
Vue.use(Table)
Vue.use(Pagination)
Vue.use(Carousel)
Vue.use(Input)
Vue.use(MenuItem)
Vue.use(CarouselItem)
Vue.use(TableColumn)



import App from './App.vue'
import router from './router'

//引入字体
import './iconfont/iconfont.css'

//引入图片懒加载的包和图片
import VueLazyload from 'vue-lazyload';
import myPicture from '@/assets/default.png'

Vue.config.productionTip = false

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
