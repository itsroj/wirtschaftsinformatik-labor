<template>

  <main class="mun-page">

    <Navbar />

    <section class="page-content">

      <!-- Hauptbereich -->
      <section class="intro-section">

        <MunIntroCard />

      </section>

      <!-- Unterer Bereich -->
      <section class="bottom-section">

        <div class="bottom-wrapper">

            <MunInfoLinks />

            <MunCTASection />
        </div>

      </section>

    </section>

    <Footer />

  </main>

</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'

import MunIntroCard from '@/components/mun/MunIntroCard.vue'
import MunInfoLinks from '@/components/mun/MunInfoLinks.vue'
import MunCTASection from '@/components/mun/MunCTASection.vue'
</script>

<style scoped>

.mun-page {
  min-height: 100vh;

  background:
    radial-gradient(
      circle at top,
      #66bdf5 0%,
      #3c95d1 45%,
      #2677b5 100%
    );

  overflow-x: hidden;
}

.page-content {
  width: min(1200px, 92%);
  margin: 70px auto 120px;

  display: flex;
  flex-direction: column;
  gap: 60px;
}

.bottom-section {
  display: block;
  align-items: center;

  gap: 50px;
}

.bottom-wrapper {
  width: min(1200px, 92%);
  margin: 0 auto;

  display: flex;
  gap: 60px;
  align-items: stretch;
}

@media (max-width: 1000px) {

  .bottom-section {
    flex-direction: column;
  }


  .bottom-wrapper {
    flex-direction: column;
    gap: 40px;
    align-items: stretch;
  }
}


</style>