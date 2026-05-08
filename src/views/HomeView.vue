<template>
  <main class="home">
    <Navbar />

    <section class="hero-wrapper">
      <HeroSection />
    </section>

    <section class="map-wrapper">
      <DeutschlandMap />
    </section>

    <Footer />
  </main>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import HeroSection from '@/components/HeroSection.vue'
//import EventMap from '@/components/map/EventMap.vue'
import DeutschlandMap from '@/components/map/DeutschlandMap.vue'
import Footer from '@/components/Footer.vue'
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