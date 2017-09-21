import Vue from 'vue'
import Router from 'vue-router'
import Seller from '@/components/seller/Seller'
import Ratings from '@/components/ratings/Ratings'
import Goods from '@/components/goods/Goods'

Vue.use(Router)
var routes = [
  // 重定向
  {
    path: '/',
    redirect: {name: 'goods'}

  },
  {
    path: '/goods',
    name: 'goods',
    component: Goods
  },
  {
    path: '/seller',
    component: Seller
  },
  {
    path: '/ratings',
    component: Ratings
  }
]
export default new Router({
  routes,
  linkActiveClass: 'active'
})
