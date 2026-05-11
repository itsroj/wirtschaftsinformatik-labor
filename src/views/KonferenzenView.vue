<template>

  <main class="conferences-page">

    <Navbar />

    <section class="page-content">

      <!-- TOP -->
      <section class="top-section">

        <!-- FILTER -->
        <ConferenceFilters
          :search="search"
          :selectedTypes="selectedTypes"
          :selectedLanguages="selectedLanguages"
          @update-search="search = $event"
          @toggle-type="toggleType"
          @toggle-language="toggleLanguage"
          @sort="handleSort"
        />

        <!-- MAP -->
        <ConferenceMapSection
        :events="filteredEvents"
        />

      </section>

      <!-- LIST -->
      <ConferenceList
        :events="filteredEvents"
      />

    </section>

    <Footer />

  </main>

</template>

<script setup>
import { ref, computed } from 'vue'

import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'

import ConferenceFilters from '@/components/conferences/ConferenceFilters.vue'
import ConferenceMapSection from '@/components/conferences/ConferenceMapSection.vue'
import ConferenceList from '@/components/conferences/ConferenceList.vue'

import events from '@/data/events'

/* SEARCH */
const search = ref('')

/* FILTER */
const selectedTypes = ref([])

const selectedLanguages = ref([])

const sortConfig = ref(null)

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

  return events.filter(event => {

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

    if (sortConfig.value) {

    const { key, direction } = sortConfig.value

    result = result.sort((a, b) => {

      const valA = a[key]
      const valB = b[key]

      if (direction === 'asc') return valA > valB ? 1 : -1
      return valA < valB ? 1 : -1
    })
  }

  return result

})

const handleSort = ({ key, direction }) => {
  sortConfig.value = { key, direction }
}
</script>

<style scoped>

.conferences-page {
  overflow: visible;
  min-height: 100vh;

  background:
    radial-gradient(
      circle at top,
      #66bdf5 0%,
      #3c95d1 45%,
      #2677b5 100%
    );
}

.page-content {

  width: min(1400px, 92%);
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




@media (max-width: 1100px) {

  .top-section {
    grid-template-columns: 1fr;
  }

  .filters {
    position: static;
  }
}


</style>