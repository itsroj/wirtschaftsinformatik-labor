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
import { computed, onMounted } from 'vue'
import { useEventsStore } from '@/stores/useEventsStore'
import Navbar from '@/components/layout/Navbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import DeutschlandMap from '@/components/map/DeutschlandMap.vue'
import Footer from '@/components/layout/Footer.vue'

const eventsStore = useEventsStore()

// Events über den Store laden (inkl. Fehlerbehandlung und loading-State)
const events = computed(() => eventsStore.events)

onMounted(async () => {
  // Nur laden wenn noch keine Events im Store (vermeidet Doppel-Request wenn man zurücknavigiert)
  if (eventsStore.events.length === 0) {
    await eventsStore.fetchEvents()
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
