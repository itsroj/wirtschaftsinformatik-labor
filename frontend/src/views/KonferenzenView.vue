<template>

  <main class="conferences-page">

    <Navbar />

    <section class="page-content">

      <!-- TOP -->
      <section class="top-section" ref="topSectionRef">

        <!-- FILTER -->
        <ConferenceFilters :search="eventsStore.search" :selectedTypes="eventsStore.selectedTypes"
          :selectedLanguages="eventsStore.selectedLanguages" :sortConfig="sortConfig" :viewMode="viewMode"
          :showPastEvents="eventsStore.showPastEvents"
          @update-search="eventsStore.search = $event" @toggle-type="eventsStore.toggleType"
          @toggle-language="eventsStore.toggleLanguage" @sort="setSort" @change-view="viewMode = $event"
          @toggle-past-events="eventsStore.showPastEvents = !eventsStore.showPastEvents" />

        <!-- CALENDAR & MAP -->
        <ConferenceCalendarSection v-if="viewMode === 'calendar'" :events="filteredEvents" />

        <ConferenceMapSection v-else :events="filteredEvents" />

      </section>

      <!-- Button zum Runterscrollen zur Event-Liste -->
      <button class="scroll-to-list-button" :class="{ hidden: !showScrollButton }" @click="scrollToList">
        <span class="label">{{ languageStore.t('konferenzen.scrollToList') }}</span>
        <span class="arrow">↓</span>
      </button>

      <!-- LIST -->
      <ConferenceList ref="listRef" :events="filteredEvents" />

    </section>

    <Footer />

  </main>

</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLanguageStore } from '@/stores/useLanguageStore'

import { useEventsStore } from '@/stores/useEventsStore'

const languageStore = useLanguageStore()

import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'

import ConferenceFilters from '@/components/conferences/ConferenceFilters.vue'
import ConferenceMapSection from '@/components/conferences/ConferenceMapSection.vue'
import ConferenceCalendarSection from '@/components/conferences/ConferenceCalendarSection.vue'
import ConferenceList from '@/components/conferences/ConferenceList.vue'


const route = useRoute()

const eventsStore = useEventsStore()

// Sortierungskonfiguration
const sortConfig = ref({ key: null, direction: null })

watch(
  () => route.query,
  (q) => {
    if (!q.type) return
    eventsStore.selectedTypes = [q.type]
  },
  { immediate: true }
)

const filteredEvents = computed(() => {
  let events = eventsStore.filteredEvents

  // Sortierung anwenden
  if (sortConfig.value.key) {
    events = [...events].sort((a, b) => {
      let aVal, bVal

      if (sortConfig.value.key === 'date') {
        // Sortiere nach dem nächsten/aktuellsten Termin
        const aConf = a.conferences && a.conferences.length > 0
          ? a.conferences[0]?.date || a.date
          : a.date
        const bConf = b.conferences && b.conferences.length > 0
          ? b.conferences[0]?.date || b.date
          : b.date

        aVal = aConf ? new Date(aConf).getTime() : Infinity
        bVal = bConf ? new Date(bConf).getTime() : Infinity
      } else if (sortConfig.value.key === 'participants') {
        aVal = a.participants || 0
        bVal = b.participants || 0
      }

      return sortConfig.value.direction === 'asc' ? aVal - bVal : bVal - aVal
    })
  }

  return events
})

const setSort = ({ key, direction }) => {
  sortConfig.value = { key, direction }
}

onMounted(async () => {
  await eventsStore.fetchEvents()

  if (route.query.search) {
    eventsStore.search = route.query.search
  }

  // Wenn ?highlight=id in der URL steht (Navigation von der Homepage),
  // das Event auswählen und zur Karte scrollen
  if (route.query.highlight) {
    const id = Number(route.query.highlight)
    eventsStore.setSelectedEvent(id, { scroll: true })
  }
})



/* SEARCH */

const viewMode = ref('calendar')

const listRef = ref(null)

const topSectionRef = ref(null)

const showScrollButton = ref(true)

let observer = null


const scrollToList = () => {
  listRef.value?.$el?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

onMounted(() => {

  if (!topSectionRef.value) return

  observer = new IntersectionObserver(
    ([entry]) => {

      // sichtbar solange top-section sichtbar ist
      showScrollButton.value = entry.isIntersecting
    },
    {
      threshold: 0.15
    }
  )

  observer.observe(topSectionRef.value)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

</script>

<style scoped>
.conferences-page {
  overflow: visible;
  min-height: 100vh;

  background:
    radial-gradient(circle at top,
      #66bdf5 0%,
      #3c95d1 45%,
      #2677b5 100%);
}

.page-content {

  width: min(1200px, 92%);
  margin: 60px auto 120px;

  display: flex;
  flex-direction: column;
  gap: 50px;
}

.top-section {

  min-height: 650px;
  display: grid;
  grid-template-columns: 360px 1fr;

  gap: 48px;

  align-items: stretch;
}

.scroll-to-list-button {

  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);

  z-index: 999;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 2px;

  padding: 10px 22px;

  background: rgba(255, 255, 255, 0.92);
  color: #0f3b66;

  border: none;
  border-radius: 18px;

  cursor: pointer;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
  /*  backdrop-filter: blur(10px); */

  transition:
    opacity 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.scroll-to-list-button:hover {
  transform: translateX(-50%) translateY(-3px);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.22);
}

.scroll-to-list-button.hidden {

  opacity: 0;

  pointer-events: none;

  transform:
    translateX(-50%) translateY(12px);
}

.label {

  font-size: 13px;
  font-weight: 600;

  letter-spacing: 0.02em;
}

.arrow {

  font-size: 22px;
  line-height: 1;

  animation:
    bounce 1.8s infinite;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(4px);
  }
}


@media (max-width: 1100px) {

  .top-section {
    grid-template-columns: 1fr;
  }

  .filters {
    position: static;
  }
}

@media (max-width: 700px) {

  .scroll-to-list-button {

    bottom: 18px;

    padding: 9px 18px;
  }
}
</style>