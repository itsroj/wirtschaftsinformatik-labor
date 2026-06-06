import { createApp, nextTick } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)
  .mount('#app')

router.afterEach(async (to) => {
  await nextTick()

  // -------------------------
  // 1. FOOTER / HASH SCROLL
  // -------------------------
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

  // -------------------------
  // 2. NORMAL NAVIGATION → TOP
  // -------------------------
  requestAnimationFrame(() => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

    document.getElementById('app')?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

  })
})