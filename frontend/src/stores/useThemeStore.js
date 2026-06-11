import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(localStorage.getItem('appTheme') === 'dark')

  const applyClass = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleDark = () => {
    isDark.value = !isDark.value
    localStorage.setItem('appTheme', isDark.value ? 'dark' : 'light')
    applyClass()
  }

  // Beim Laden sofort anwenden
  applyClass()

  return { isDark, toggleDark }
})
