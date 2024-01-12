import Vue from 'vue'
import VueRouter from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import authRouter from './auth-router'
import userRouter from './user-router'
import adminRouter from './admin-router'

Vue.use(VueRouter)

const routes = [
  //...guestRouter,
  ...authRouter,
  ...adminRouter,
  ...userRouter
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
