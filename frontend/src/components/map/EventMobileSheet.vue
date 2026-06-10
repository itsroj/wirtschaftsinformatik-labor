<template>
  <!--
    EventMobileSheet: Mobilansicht für ein ausgewähltes Event.
    Erscheint als Sheet (Schublade) von unten auf dem Bildschirm.
    Der Nutzer kann es nach unten wischen (Swipe-Geste) um es zu schließen.
    Wird von DeutschlandMap.vue angezeigt, wenn isMobile = true ist.
  -->
  <div class="popup" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">

    <!-- Visueller Griff-Balken oben am Sheet (zeigt, dass es verschiebbar ist) -->
    <div class="handle"></div>

    <!-- Inhalt: Links Infos, Rechts Button -->
    <div class="content-row">

      <div class="info">
        <div class="badge">{{ props.event.city }}</div>
        <h3>{{ props.event.title }}</h3>
        <p class="long-title">{{ props.event.longTitle }}</p>
        <div class="meta">📅 {{ getEventDate() }}</div>
      </div>

      <!-- Button: sendet "goToList" nach oben → DeutschlandMap scrollt zur Liste -->
      <button class="goto-btn" @click="$emit('goToList')">
        {{ languageStore.t('map.goToConference') }} →
      </button>

    </div>

  </div>
</template>

<script setup>
import { formatEventDate } from '@/utils/eventPresenter'
import { useLanguageStore } from '@/stores/useLanguageStore'
import { ref } from 'vue'

// Übersetzungs-Store (DE/EN)
const languageStore = useLanguageStore()

// Props: Das angeklickte Event-Objekt
const props = defineProps({
  event: Object
})

// Events, die diese Komponente nach außen senden kann:
// - "close": Sheet schließen (beim Swipe nach unten)
// - "goToList": zur Konferenz-Karte in der Liste scrollen
const emit = defineEmits(['close', 'goToList'])

// --- Swipe-Logik ---
// Wir merken uns die Start-Position des Fingers und berechnen die Bewegung.
// Wenn der Nutzer mehr als 80px nach unten wischt, wird das Sheet geschlossen.
const startY = ref(0)
const currentY = ref(0)
const dragging = ref(false)

const onTouchStart = (e) => {
  startY.value = e.touches[0].clientY
  dragging.value = true
}

const onTouchMove = (e) => {
  if (!dragging.value) return
  currentY.value = e.touches[0].clientY
  const diff = currentY.value - startY.value

  // Nur nach unten wischen schließt das Sheet
  if (diff > 80) {
    emit('close')
    dragging.value = false
  }
}

const onTouchEnd = () => {
  dragging.value = false
}

// Nächste bevorstehende Konferenz oder aktuell laufende; Fallback auf neueste
const getNextConference = (event) => {
  const confs = event?.conferences
  if (!confs || confs.length === 0) return null

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcoming = confs
    .filter(c => {
      const end = c.endDate || c.date
      return end && new Date(end) >= today
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  if (upcoming.length > 0) return upcoming[0]

  return [...confs].sort((a, b) => new Date(b.date) - new Date(a.date))[0]
}

// Liest das Datum aus der Event-Datenstruktur.
// Neue Struktur: nächste bevorstehende Conference
// Alte Struktur (Fallback): event.date
const getEventDate = () => {
  if (!props.event) return ''

  const lang = languageStore.currentLanguage
  const conf = getNextConference(props.event)

  if (conf?.date) return formatEventDate(conf.date, lang)
  if (props.event?.date) return formatEventDate(props.event.date, lang)

  return ''
}
</script>

<style scoped>
.popup {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  background: white;
  border-radius: 24px 24px 0 0;

  padding: 16px 20px 28px;

  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.15);

  z-index: 9999;

  display: flex;
  flex-direction: column;
  gap: 0;
}

/* Handle */
.handle {
  width: 44px;
  height: 5px;
  background: rgb(127, 126, 126);
  border-radius: 999px;
  margin: 6px auto 16px;
  flex-shrink: 0;
}

/* Hauptzeile: Infos links, Button rechts */
.content-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.info {
  flex: 1;
  min-width: 0;
}

.badge {
  display: inline-flex;
  padding: 4px 12px;
  border-radius: 999px;
  background: linear-gradient(135deg, #d9eefc, #c7e3f8);
  color: #0b558f;
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 8px;
}

h3 {
  font-size: 17px;
  font-weight: 700;
  color: #0f3b66;
  margin: 0 0 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.long-title {
  font-size: 12px;
  color: #888;
  margin: 0 0 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta {
  font-size: 13px;
  color: #555;
}

/* Rechter Button */
.goto-btn {
  flex-shrink: 0;
  padding: 12px 18px;
  background: linear-gradient(135deg, #0f3b66, #1a5fa8);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 4px 14px rgba(15, 59, 102, 0.3);
  transition: opacity 0.2s ease;
}

.goto-btn:hover {
  opacity: 0.88;
}
</style>