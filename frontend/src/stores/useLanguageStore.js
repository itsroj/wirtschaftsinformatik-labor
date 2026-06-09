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
  // Sprache aus localStorage oder Deutsch als Standard
  const currentLanguage = ref(
    localStorage.getItem('appLanguage') || 'de'
  )

  /**
   * Wechsle zwischen Sprachen
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
   * Übersetzung abrufen
   * z.B. t('navbar.home') => "Startseite" oder "Home"
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
