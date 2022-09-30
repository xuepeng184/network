import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
Vue.use(VueRouter)
let router=new VueRouter({
  routes,
  //根据滚动行为切换到页面顶部
  scrollBehavior(to,from,savedPosition){
    return {y:0}
  }
})

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router