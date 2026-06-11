import { createRouter, createWebHistory } from 'vue-router'

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
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
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
    },
    {
      // Fallback: alle unbekannten Routen → Login
      path: '/:pathMatch(.*)*',
      redirect: '/login'
    }
  ]
})

function isTokenValid() {
  const token = localStorage.getItem('admin_token')
  if (!token) return false
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (!payload.exp) return false
    return payload.exp * 1000 > Date.now()
  } catch {
    // Token ist kein gültiges JWT-Format
    localStorage.removeItem('admin_token')
    return false
  }
}

router.beforeEach((to, from) => {
  const loggedIn = isTokenValid()

  if (to.name === 'login' && loggedIn) {
    return '/dashboard'
  }

  if (to.meta.requiresAuth && !loggedIn) {
    localStorage.removeItem('admin_token')
    return '/login'
  }
})

export default router