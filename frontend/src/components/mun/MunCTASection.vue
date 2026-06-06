<template>
  <section class="cta-section">

    <img
      src="@/assets/images/germany.svg"
      alt="Deutschlandkarte"
    >

    <div class="buttons">

      <RouterLink to="/konferenzen" class="cta-button">
        Konferenzen finden
      </RouterLink>

      <RouterLink to="/teilnahme" class="cta-button">
        Teilnahme
      </RouterLink>

    </div>

  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
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
  box-shadow: 0 10px 22px rgba(0,0,0,0.15);
}

@media (max-width: 1000px) {

  .cta-section {
    width: 100%;
    min-height: 320px;
  }

  .cta-section img {
    width: 100%;
  }
}

</style>