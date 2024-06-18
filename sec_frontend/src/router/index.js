import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShiftCipher from '../views/ShiftCipher.vue'
import BookCipher from '../views/BookCipher.vue'
import SQLi from '../views/SQLi.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/shift',
      name: 'shift',
      component: ShiftCipher
    },
    {
      path: '/book',
      name: 'book',
      component: BookCipher
    },
    {
      path: '/sqli',
      name: 'sqli',
      component: SQLi
    }
  ]
})

export default router
