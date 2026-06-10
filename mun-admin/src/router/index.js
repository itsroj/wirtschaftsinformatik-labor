import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/konferenzen/neu',
      name: 'konferenzen-neu',
      component: () => import('../views/KonferenzView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/konferenzen/bearbeiten/:id',
      name: 'konferenzen-bearbeiten',
      component: () => import('../views/KonferenzView.vue'),
      meta: { requiresAuth: true }
    },
    {
  path: '/einstellungen',
  name: 'einstellungen',
  component: () => import('../views/EinstellungenView.vue'),
  meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('admin_token')
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router