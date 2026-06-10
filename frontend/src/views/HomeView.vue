<template>
  <main class="home">
    <Navbar />

    <section class="hero-wrapper">
      <HeroSection />
    </section>

    <section class="map-wrapper">
      <DeutschlandMap :events="events" size="small" />
    </section>

    <Footer />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useEventsStore } from '@/stores/useEventsStore'
import Navbar from '@/components/layout/Navbar.vue'
import HeroSection from '@/components/HeroSection.vue'
//import EventMap from '@/components/map/EventMap.vue'
import DeutschlandMap from '@/components/map/DeutschlandMap.vue'
import Footer from '@/components/layout/Footer.vue'

const eventsStore = useEventsStore()

// Fetch events vom Backend statt aus static data
const events = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:5000/api/events')
    if (!response.ok) throw new Error('Failed to fetch events')
    events.value = await response.json()
    eventsStore.events = events.value
  } catch (err) {
    error.value = err.message
    console.error('Error fetching events:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.home {
  width: 100%;
}

.hero-wrapper,
.map-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
