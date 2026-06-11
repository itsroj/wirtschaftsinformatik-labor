import { defineStore } from 'pinia'
import { ref } from 'vue'

// Store für den Dark/Light-Mode.
// Liest den gespeicherten Wert aus localStorage und setzt sofort die CSS-Klasse auf <html>.
export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(localStorage.getItem('appTheme') === 'dark')

  // Fügt die 'dark'-Klasse auf <html> hinzu oder entfernt sie – steuert alle Dark-Mode-CSS-Overrides
  const applyClass = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Schaltet zwischen Dark und Light um, persistiert die Wahl und wendet die CSS-Klasse an
  const toggleDark = () => {
    isDark.value = !isDark.value
    localStorage.setItem('appTheme', isDark.value ? 'dark' : 'light')
    applyClass()
  }

  // Beim Laden sofort anwenden
  applyClass()

  return { isDark, toggleDark }
})
