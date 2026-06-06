import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import WasIstMunView from '@/views/WasIstMunView.vue'
import KonferenzenView from '@/views/KonferenzenView.vue'
import TeilnahmeView from '@/views/TeilnahmeView.vue'
import ServiceView from '@/views/ServiceView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/was-ist-mun', name: 'was-ist-mun', component: WasIstMunView },
  { path: '/konferenzen', name: 'konferenzen', component: KonferenzenView },
  { path: '/teilnahme', name: 'teilnahme', component: TeilnahmeView },
  { path: '/service', name: 'service', component: ServiceView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior() {
    // wichtig: komplett deaktivieren
    return false
  }
})

export default router