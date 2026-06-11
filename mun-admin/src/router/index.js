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

router.beforeEach((to, from) => {
  const isLoggedIn = localStorage.getItem('admin_token')

  // Eingeloggter User muss nicht zur Login-Seite
  if (to.name === 'login' && isLoggedIn) {
    next('/dashboard')
    return
  }

  // TODO (Backlog): Token nur auf Vorhandensein geprüft, nicht auf Gültigkeit.
  // Saubere Lösung: GET /api/auth/verify gegen Backend, bei 401 Token löschen + redirect.
  if (to.meta.requiresAuth && !isLoggedIn) {
    return '/login'
  }
})

export default router