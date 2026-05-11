import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import WasIstMunView from '@/views/WasIstMunView.vue'
import KonferenzenView from '@/views/KonferenzenView.vue'
import TeilnahmeView from '@/views/TeilnahmeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
  path: '/was-ist-mun',
  name: 'was-ist-mun',
  component: WasIstMunView
  },

  {
  path: '/konferenzen',
  name: 'konferenzen',
  component: KonferenzenView
  },

  {
    path: '/teilnahme',
    name: 'Teilnahme',
    component: TeilnahmeView
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router