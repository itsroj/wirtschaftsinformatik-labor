import { createApp, nextTick } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// Vue-App erstellen und Pinia (State Management) + Router registrieren
const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')

// Nach jeder Routen-Navigation:
// - Enthält die neue Route einen Hash-Anker (#abschnitt): bis zu 20 Versuche im 50ms-Intervall
//   scrollen, bis das Element im DOM verfügbar ist (nötig weil Seiten asynchron rendern).
// - Keine Hash-Navigation: Seite smooth nach oben scrollen.
router.afterEach(async (to) => {
  await nextTick()

  if (to.hash) {
    const tryScroll = () => {
      const el = document.querySelector(to.hash)
      if (!el) return false

      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })

      return true
    }

    let attempts = 0

    const interval = setInterval(() => {
      attempts++

      if (tryScroll() || attempts > 20) {
        clearInterval(interval)
      }
    }, 50)

    return
  }

  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.getElementById('app')?.scrollTo({ top: 0, behavior: 'smooth' })
  })
})