<template>
  <section class="cta-section">

    <img
      src="@/assets/images/germany.svg"
      alt="Deutschlandkarte"
    >

    <div class="buttons">

      <RouterLink to="/konferenzen" class="cta-button">
        {{ languageStore.t('munCTA.findConferences') }}
      </RouterLink>

      <RouterLink to="/teilnahme" class="cta-button">
        {{ languageStore.t('munCTA.participation') }}
      </RouterLink>

    </div>

  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useLanguageStore } from '@/stores/useLanguageStore'

const languageStore = useLanguageStore()
</script>

<style scoped>

.cta-section {
  position: relative;
  flex: 0.6;
  display: flex;
  justify-content: center;
  align-items: center;

}

.cta-section img {
  width: 60%;

  filter: drop-shadow(0 25px 40px rgba(0,0,0,0.25));
}

.buttons {
  position: absolute;

  display: flex;
  flex-direction: column;

  gap: 24px;
}

.cta-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 14px;

  padding: 16px 28px;

  background: white;

  font-size: 1rem;
  font-weight: 600;

  cursor: pointer;
  text-decoration: none;

  color: #1b1b1b;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.cta-button:hover {
  transform: translateY(-2px);

  box-shadow:
    0 6px 18px rgba(0,0,0,0.2);
}

@media (max-width: 1100px) {

  .cta-section {
    flex: 1;
  }

  .cta-section img {
    width: 80%;
  }
}

@media (max-width: 700px) {

  .cta-section img {
    width: 100%;
  }

  .buttons {
    gap: 18px;
  }

  .cta-button {
    padding: 14px 24px;

    font-size: 0.95rem;
  }
}

</style>