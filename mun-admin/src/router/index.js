/**
 * router/index.js
 * 
 * Definiert alle Routen der Admin-Anwendung und steuert den Navigationszugriff
 * via einem globalen Navigation Guard. Geschützte Routen erfordern ein gültiges
 * JWT-Token im localStorage.
 */

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Wurzelpfad leitet direkt zum Login weiter
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
      // Formular zum Anlegen einer neuen Konferenz
      path: '/konferenzen/neu',
      name: 'konferenzen-neu',
      component: () => import('../views/KonferenzView.vue'),
      meta: { requiresAuth: true }
    },
    {
      // Formular zum Bearbeiten einer bestehenden Konferenz (ID via URL-Parameter)
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

/**
 * Prüft ob ein JWT-Token im localStorage vorhanden und noch nicht abgelaufen ist.
 * Hinweis: Diese Prüfung ist rein clientseitig und kann kein serverseitig
 * invalidiertes Token erkennen.
 * 
 * TODO (Backlog): Token zusätzlich serverseitig gegen GET /api/auth/me validieren,
 * um invalidierte oder manipulierte Tokens sicher abzufangen.
 */
function isTokenValid() {
  const token = localStorage.getItem('admin_token')
  if (!token) return false

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (!payload.exp) return false
    return payload.exp * 1000 > Date.now()
  } catch {
    // Token ist kein gültiges JWT-Format → direkt entfernen
    localStorage.removeItem('admin_token')
    return false
  }
}

/**
 * Globaler Navigation Guard — läuft vor jeder Routenänderung.
 * 
 * Logik:
 * - Bereits eingeloggte Nutzer werden vom Login-Screen zum Dashboard umgeleitet
 * - Nicht eingeloggte Nutzer werden von geschützten Routen zum Login umgeleitet
 */
router.beforeEach((to, from) => {
  const loggedIn = isTokenValid()

  // Eingeloggte Nutzer sollen den Login-Screen nicht sehen
  if (to.name === 'login' && loggedIn) {
    return '/dashboard'
  }

  // Nicht eingeloggte Nutzer dürfen keine geschützten Routen aufrufen
  if (to.meta.requiresAuth && !loggedIn) {
    localStorage.removeItem('admin_token')
    return '/login'
  }
})

export default router