import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Importiere Übersetzungen
import de from '@/locales/de.json'
import en from '@/locales/en.json'

const translations = {
  de,
  en
}

export const useLanguageStore = defineStore('language', () => {
  // Aktive Sprache ('de' oder 'en'), wird in localStorage persistiert
  const currentLanguage = ref(
    localStorage.getItem('appLanguage') || 'de'
  )

  /**
   * Wechselt zwischen Deutsch und Englisch und speichert die Wahl in localStorage
   */
  const toggleLanguage = () => {
    currentLanguage.value = currentLanguage.value === 'de' ? 'en' : 'de'
    localStorage.setItem('appLanguage', currentLanguage.value)
  }

  /**
   * Setze explizite Sprache
   */
  const setLanguage = (lang) => {
    if (['de', 'en'].includes(lang)) {
      currentLanguage.value = lang
      localStorage.setItem('appLanguage', lang)
    }
  }

  /**
   * Übersetzungsschlüssel per Dot-Notation auflösen (z.B. 'navbar.home' → 'Startseite').
   * Fällt auf Deutsch zurück wenn ein Schlüssel in der gewählten Sprache fehlt.
   */
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[currentLanguage.value]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Fallback zu Deutsch wenn Schlüssel nicht gefunden
        value = translations.de
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            return key // Gib Schlüssel zurück wenn nichts gefunden
          }
        }
        return value
      }
    }

    return value
  }

  /**
   * Gib alle Übersetzungen für aktuelle Sprache zurück
   */
  const currentTranslations = computed(() => translations[currentLanguage.value])

  return {
    currentLanguage,
    toggleLanguage,
    setLanguage,
    t,
    currentTranslations
  }
})
