<template>
  <section class="calendar-section">

    <!-- LEGEND -->
    <div class="legend">
      <div class="legend-item">
        <span class="dot conference"></span>
        {{ languageStore.t('konferenzen.calendar.legend.conference') }}
      </div>

      <div class="legend-item">
        <span class="dot application"></span>
        {{ languageStore.t('konferenzen.calendar.legend.application') }}
      </div>
    </div>

    <!-- CALENDAR -->
    <FullCalendar :options="calendarOptions" />

  </section>
</template>

<script setup>
import { computed } from 'vue'

import { useEventsStore } from '@/stores/useEventsStore'
import { useLanguageStore } from '@/stores/useLanguageStore'

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import deLocale from '@fullcalendar/core/locales/de'

const props = defineProps({
  events: { type: Array, default: () => [] }
})

const store = useEventsStore()
const languageStore = useLanguageStore()

/**
 * CALENDAR EVENTS
 * - Nutzt neue Struktur mit Conferences
 * - Zeigt alle Conferences eines Events an
 */
const calendarEvents = computed(() => {

  return (props.events || []).flatMap(event => {

    const items = []

    // 🟦 ALLE KONFERENZEN
    if (event.conferences && event.conferences.length > 0) {
      event.conferences.forEach((conf, idx) => {
        items.push({
          id: `${event.id}-conference-${conf.id}`,
          title: `${event.title} - ${event.longTitle}`,
          start: conf.date,
          end: conf.endDate,

          allDay: true,

          extendedProps: {
            eventId: event.id,
            type: 'conference'
          },

          classNames: ['event-conference']
        })

        // 🟧 BEWERBUNG für diese Conference
        if (conf.applicationDate) {
          items.push({
            id: `${event.id}-application-${conf.id}`,
            title: `${event.title} ${languageStore.t('konferenzen.calendar.legend.application')}`,
            start: conf.applicationDate,

            allDay: true,

            extendedProps: {
              eventId: event.id,
              type: 'application'
            },

            classNames: ['event-application']
          })
        }
      })
    } else if (event.date) {
      // FALLBACK für alte Events (Abwärtskompatibilität)
      items.push({
        id: `${event.id}-conference`,
        title: `${event.title} - ${event.longTitle}`,
        start: event.date,
        end: event.endDate,

        allDay: true,

        extendedProps: {
          eventId: event.id,
          type: 'conference'
        },

        classNames: ['event-conference']
      })

      if (event.applicationDate) {
        items.push({
          id: `${event.id}-application`,
          title: `${event.title} Frist`,
          start: event.applicationDate,

          allDay: true,

          extendedProps: {
            eventId: event.id,
            type: 'application'
          },

          classNames: ['event-application']
        })
      }
    }

    return items
  })
})

/**
 * CALENDAR OPTIONS
 */
const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin],
  locale: languageStore.currentLanguage.value === 'de' ? deLocale : 'en',
  initialView: 'dayGridMonth',

  displayEventTime: false,

  events: calendarEvents.value,

  eventClick(info) {
    const id = info.event.extendedProps.eventId

    store.setSelectedEvent(id, { scroll: true })
  }
}
))
</script>

<style scoped>
.calendar-section {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border-radius: 28px;
  padding: 24px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.legend {

  display: flex;
  gap: 24px;

  margin-bottom: 20px;
}

.legend-item {

  display: flex;
  align-items: center;
  gap: 8px;

  font-weight: 500;
}

.dot {

  width: 14px;
  height: 14px;

  border-radius: 50%;
}

.conference {
  background: #0f3b66;
}

.application {
  background: #f59e0b;
}

:deep(.fc) {
  font-family: inherit;
}

:deep(.event-conference) {
  background: #0f3b66 !important;
  border: none !important;
  color: white !important;
  border-radius: 8px;
  padding: 2px 4px;
}

:deep(.event-application) {
  background: #f59e0b !important;
  border: none !important;
  color: white !important;
  border-radius: 8px;
}

:deep(.fc-event) {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

:deep(.fc-event:hover) {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>