import { defineStore } from 'pinia'

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [],
    loading: false,

    selectedTypes: [],
    selectedLanguages: [],
    search: '',

    selectedEventId: null,
    scrollRequestId: 0,
    highlightRequestId: 0
  }),

  getters: {
    filteredEvents: (state) => {
      const search = (state.search || '').toLowerCase()

      // Normalisiert alle bekannten DB-Werte auf einen kanonischen Wert
      const normalizeType = (type) => {
        if (!type) return ''
        const t = type.toLowerCase()
        if (t === 'pupil' || t === 'schueler') return 'pupil'
        if (t === 'student' || t === 'studenten') return 'student'
        if (t === 'minimun' || t === 'mini-mun') return 'mini-mun'
        return t
      }

      // Normalisiert Sprach-Werte auf kanonische Form
      const normalizeLanguage = (lang) => {
        if (!lang) return ''
        const l = lang.toLowerCase()
        if (l === 'english') return 'en'
        if (l === 'german' || l === 'deutsch') return 'de'
        return l
      }

      return state.events.filter(event => {

        const matchesSearch =
          !search ||
          event.title.toLowerCase().includes(search)

        const matchesType =
          state.selectedTypes.length === 0 ||
          state.selectedTypes.includes(normalizeType(event.type))

        // Bei Sprachfilter: 'both' passt immer zu de UND en
        const eventLang = normalizeLanguage(event.language)
        const matchesLanguage =
          state.selectedLanguages.length === 0 ||
          state.selectedLanguages.includes(eventLang) ||
          eventLang === 'both'

        return matchesSearch && matchesType && matchesLanguage
      })
    },

    selectedEvent(state) {
      return state.events.find(e => e.id === state.selectedEventId) || null
    }
  },

  actions: {

    async fetchEvents() {
      this.loading = true
      try {
        const res = await fetch('http://localhost:5000/api/events')
        this.events = await res.json()
      } finally {
        this.loading = false
      }
    },

    toggleType(type) {
      if (this.selectedTypes.includes(type)) {
        this.selectedTypes = this.selectedTypes.filter(t => t !== type)
      } else {
        this.selectedTypes.push(type)
      }
    },

    toggleLanguage(lang) {
      if (this.selectedLanguages.includes(lang)) {
        this.selectedLanguages = this.selectedLanguages.filter(l => l !== lang)
      } else {
        this.selectedLanguages.push(lang)
      }
    },

    setSelectedEvent(id, { scroll = false } = {}) {
        this.selectedEventId = id
        this.selectedEventLocked = true

        // nur Highlight (Sidebar / Map)
        this.highlightRequestId++

        // nur wenn explizit gewünscht
        if (scroll) {
            this.scrollRequestId++
        }
    },

    setSearch(value) {
      this.search = value
    },

    clearSelectedEvent() {
        this.selectedEventId = null
        this.selectedEventLocked = false
        this.highlightRequestId++
    }
  }
})