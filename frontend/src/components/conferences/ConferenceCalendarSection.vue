<template>
  <section class="calendar-section">

    <!-- LEGEND -->
    <div class="legend">
      <div class="legend-item">
        <span class="dot conference"></span>
        Konferenz
      </div>

      <div class="legend-item">
        <span class="dot application"></span>
        Bewerbungsfrist
      </div>
    </div>

    <!-- CALENDAR -->
    <FullCalendar
      :options="calendarOptions"
    />

  </section>
</template>

<script setup>
import { computed } from 'vue'

import { useEventsStore } from '@/stores/useEventsStore'

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import deLocale from '@fullcalendar/core/locales/de'

const props = defineProps({
  events: { type: Array, default: () => [] }
})


const store = useEventsStore()

/**
 * CALENDAR EVENTS
 * - KEIN FILTERING mehr hier (optional später im Store)
 * - nur Mapping in FullCalendar Format
 */
const calendarEvents = computed(() => {

  return (props.events || []).flatMap(event => {

    const items = []

    // 🟦 KONFERENZ
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

    // 🟧 BEWERBUNG
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

    return items
  })
})

/**
 * CALENDAR OPTIONS
 */
const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin],
  locale: deLocale,
  initialView: 'dayGridMonth',

  displayEventTime: false,

  events: calendarEvents.value,

    eventClick(info) {
    const id = info.event.extendedProps.eventId

    store.setSelectedEvent(id)
    }
  }
))
</script>

<style scoped>

.calendar-section {
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(12px);
  border-radius: 28px;
  padding: 24px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
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
  box-shadow: 0 8px 18px rgba(0,0,0,0.2);
  cursor: pointer;
}

</style>