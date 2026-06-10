<template>
  <!--
    Sidebar: Detailansicht eines angeklickten Events (nur Desktop).
    Wird von DeutschlandMap.vue als Kind-Komponente gerendert.
    Props: selectedEvent – das aktuell ausgewählte Event-Objekt
    Emits: goToList – wenn der Nutzer auf "Zur Konferenz" klickt
  -->
  <aside class="sidebar">

    <!-- Inhalt nur anzeigen, wenn wirklich ein Event übergeben wurde -->
    <div v-if="props.selectedEvent">

      <!-- Stadtname als farbiges Badge -->
      <div class="badge">
        {{ props.selectedEvent.city }}
      </div>

      <!-- Titel der Konferenz -->
      <h3>
        {{ props.selectedEvent.title }}
      </h3>

      <!-- Datum und Teilnehmerzahl -->
      <div class="info">
        <div>
          📅 {{ getEventDate() }}
        </div>
        <div>
          👥 {{ props.selectedEvent.participants }} {{ languageStore.t('map.participants') }}
        </div>
      </div>

      <!-- Button: scrollt zur Konferenz-Karte in der Liste -->
      <button @click="$emit('goToList')">
        {{ languageStore.t('map.goToConference') }}
      </button>

    </div>

    <!-- Platzhalter, wenn kein Event ausgewählt ist -->
    <div v-else class="placeholder">
      {{ languageStore.t('map.selectEvent') }}
    </div>

  </aside>
</template>

<script setup>
import { formatEventDate } from '@/utils/eventPresenter'
import { useLanguageStore } from '@/stores/useLanguageStore'

// Übersetzungs-Store (DE/EN)
const languageStore = useLanguageStore()

// Props: das aktuell ausgewählte Event
// In Vue 3 muss defineProps() in einer Variable gespeichert werden,
// damit man im <script> mit props.xyz darauf zugreifen kann
const props = defineProps({
  selectedEvent: Object
})

// Events, die diese Komponente nach außen senden kann
defineEmits(['goToList'])

// Liest das Datum aus der Event-Datenstruktur.
// Die Datenbank speichert Konferenzdaten unter event.conferences[0].date (neue Struktur),
// ältere Einträge haben event.date direkt (Fallback).
const getEventDate = () => {
  if (!props.selectedEvent) return ''

  if (props.selectedEvent?.conferences?.[0]?.date) {
    return formatEventDate(props.selectedEvent.conferences[0].date)
  }

  if (props.selectedEvent?.date) {
    return formatEventDate(props.selectedEvent.date)
  }

  return ''
}
</script>

<style scoped>
.sidebar {
  background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.98),
      rgba(255, 255, 255, 0.92));

  border-radius: 24px;
  padding: 28px;

  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6);

  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.15),
    0 0 1px rgba(0, 0, 0, 0.1);

  min-width: 280px;
  max-width: 420px;
}

.badge {
  display: inline-flex;
  padding: 8px 16px;
  border-radius: 999px;
  background: linear-gradient(135deg, #d9eefc, #c7e3f8);
  color: #0b558f;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.3px;
}

h3 {
  margin-top: 16px;
  font-size: 22px;
  font-weight: 700;
  color: #0f3b66;
  line-height: 1.3;
}

.info {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: #505050;
  font-size: 14px;
  line-height: 1.5;
}

.info div {
  display: flex;
  align-items: center;
  gap: 8px;
}

button {
  margin-top: 28px;
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #0f3b66, #0a2a50);
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(15, 59, 102, 0.25);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(15, 59, 102, 0.35);
}

button:active {
  transform: translateY(0);
}

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #7a7a7a;
  font-size: 14px;
  padding: 40px 20px;
}
</style>