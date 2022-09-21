import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import './iconfont/iconfont.css'
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this
  },
  router
}).$mount('#app')
