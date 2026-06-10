<template>

  <main class="participation-page">

    <Navbar />

    <section class="page-content">

      <!-- BLOCK 1 -->
      <ParticipationBlock id="infos" :title="languageStore.t('teilnahme.block1Title')"
        :text="languageStore.t('teilnahme.block1')" :images="imagesBlock1" />

      <!-- BLOCK 2 -->
      <ParticipationBlock id="internationale-muns" :title="languageStore.t('teilnahme.block2Title')"
        :text="languageStore.t('teilnahme.block2')" :images="imagesBlock2" reverse />

      <!-- BLOCK 3 -->
      <ParticipationBlock id="mini-muns" :title="languageStore.t('teilnahme.block3Title')"
        :text="languageStore.t('teilnahme.block3')" :images="imagesBlock3" />

    </section>

    <Footer />

  </main>

</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'

import ParticipationBlock from '@/components/participation/ParticipationBlock.vue'
import { useLanguageStore } from '@/stores/useLanguageStore'

const languageStore = useLanguageStore()

// Import images
import mun1 from '@/assets/images/mun1.jpg'
import mun2 from '@/assets/images/mun2.jpg'
import mun3 from '@/assets/images/mun3.jpg'
import mun4 from '@/assets/images/mun4.jpg'
import mun5 from '@/assets/images/mun5.jpg'
import mun6 from '@/assets/images/mun6.jpg'
import mun7 from '@/assets/images/mun7.jpg'
import mun8 from '@/assets/images/mun8.jpg'
import mun9 from '@/assets/images/mun9.jpg'
import mun10 from '@/assets/images/mun10.jpg'
import mun11 from '@/assets/images/mun11.jpg'
import mun12 from '@/assets/images/mun12.jpg'

// Image arrays for blocks
const imagesBlock1 = [mun7, mun8, mun9]
const imagesBlock2 = [mun10, mun11, mun12, mun5, mun6]
const imagesBlock3 = [mun3, mun4]
</script>

<style scoped>
.participation-page {
  min-height: 100vh;

  background:
    radial-gradient(circle at top,
      #66bdf5 0%,
      #3c95d1 45%,
      #2677b5 100%);
}

.page-content {
  width: min(1200px, 92%);
  margin: 70px auto 120px;

  display: flex;
  flex-direction: column;
  gap: 60px;
}

#infos,
#internationale-muns,
#mini-muns {
  scroll-margin-top: 120px;
}
</style>