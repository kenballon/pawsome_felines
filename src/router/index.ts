import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/breed/:id',
      name: 'CatBreed',
      component: () => import('../views/CatBreedDetailed.vue')
    }
  ]
})

export default router
