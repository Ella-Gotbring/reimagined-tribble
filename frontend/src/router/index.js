import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import( '../views/Reg.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import( '../views/Settings.vue')
  },
  {
    path: '/flow',
    name: 'Flow',
    component: () => import( '../views/Flow.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
