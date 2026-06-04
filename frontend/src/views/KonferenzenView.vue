<template>

  <main class="conferences-page">

    <Navbar />

    <section class="page-content">

      <!-- TOP -->
      <section class="top-section" ref="topSectionRef">

        <!-- FILTER -->
        <ConferenceFilters :search="search" :selectedTypes="selectedTypes" :selectedLanguages="selectedLanguages"
          :sortConfig="sortConfig" @update-search="search = $event" @toggle-type="toggleType"
          @toggle-language="toggleLanguage" @sort="setSort" />

        <!-- MAP -->
        <ConferenceMapSection :events="filteredEvents" />

      </section>

      <!-- Button zum Runterscrollen zur Event-Liste -->
      <button class="scroll-to-list-button" :class="{ hidden: !showScrollButton }" @click="scrollToList">
        <span class="label">Eventliste</span>
        <span class="arrow">↓</span>
      </button>

      <!-- LIST -->
      <ConferenceList ref="listRef" :events="filteredEvents" />

    </section>

    <Footer />

  </main>

</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'

import ConferenceFilters from '@/components/conferences/ConferenceFilters.vue'
import ConferenceMapSection from '@/components/conferences/ConferenceMapSection.vue'
import ConferenceList from '@/components/conferences/ConferenceList.vue'

// Fetch events vom Backend statt aus static data
const events = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:5000/api/events')
    if (!response.ok) throw new Error('Failed to fetch events')
    events.value = await response.json()
  } catch (err) {
    error.value = err.message
    console.error('Error fetching events:', err)
  } finally {
    loading.value = false
  }
})

/* SEARCH */
const search = ref('')

/* FILTER */
const selectedTypes = ref([])

const selectedLanguages = ref([])

const sortConfig = ref(null)

const listRef = ref(null)

const topSectionRef = ref(null)

const showScrollButton = ref(true)

let observer = null

/* TOGGLE TYPE */
const toggleType = (type) => {

  if (selectedTypes.value.includes(type)) {

    selectedTypes.value =
      selectedTypes.value.filter(
        t => t !== type
      )

  } else {

    selectedTypes.value.push(type)
  }
}

/* TOGGLE LANGUAGE */
const toggleLanguage = (language) => {

  if (selectedLanguages.value.includes(language)) {

    selectedLanguages.value =
      selectedLanguages.value.filter(
        l => l !== language
      )

  } else {

    selectedLanguages.value.push(language)
  }
}

/* FILTERED EVENTS */
const filteredEvents = computed(() => {

  let result = (events.value || []).filter(event => {

    const matchesSearch =
      event.title
        .toLowerCase()
        .includes(search.value.toLowerCase())

    const matchesType =
      selectedTypes.value.length === 0 ||
      selectedTypes.value.includes(event.type)

    const matchesLanguage =
      selectedLanguages.value.length === 0 ||
      selectedLanguages.value.includes(event.language)

    return (
      matchesSearch &&
      matchesType &&
      matchesLanguage
    )
  })

  /* SORTIERUNG */
  if (sortConfig.value) {

    const { key, direction } = sortConfig.value

    result = [...result].sort((a, b) => {

      const valA = a[key]
      const valB = b[key]

      if (direction === 'asc') {
        return valA > valB ? 1 : -1
      }

      return valA < valB ? 1 : -1
    })
  }

  return result
})

const setSort = (config) => {
  if (
    sortConfig.value?.key === config.key &&
    sortConfig.value?.direction === config.direction
  ) {
    sortConfig.value = null
    return
  }

  sortConfig.value = config
}

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