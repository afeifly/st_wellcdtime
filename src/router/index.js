import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import RealPage from '../views/RealPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/real',
    name: 'RealPage',
    component: RealPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 