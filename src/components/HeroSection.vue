<template>
  <section class="hero">

    <div class="hero-left">

      <h1>
        Finde MUN Events
        <br>
        in ganz Deutschland
      </h1>

      <p>
        Mit unserer interaktiven Suche findest du
        <br>
        genau die passenden MUN's für dich!
      </p>

      <div class="hero-buttons">

        <button class="primary-btn">
          Alle Konferenzen
        </button>

        <div class="event-box">
          🔍 257 Events
        </div>

      </div>
    </div>

    <InfoCard />

  </section>
</template>

<script setup>
import InfoCard from './InfoCard.vue'
</script>

<style scoped>
.hero {
  width: min(1200px, 92%);

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-top: 90px;
  gap: 60px;
}

.hero-left {
  max-width: 600px;
}

h1 {
  color: white;
  font-size: clamp(42px, 6vw, 58px);
  line-height: 1.05;
  font-weight: 800;
}

p {
  margin-top: 24px;

  color: rgba(255,255,255,0.92);

  font-size: 22px;
  line-height: 1.5;
}

.hero-buttons {
  margin-top: 36px;

  display: flex;
  gap: 18px;
  flex-wrap: wrap;
}

.primary-btn {
  height: 58px;
  padding: 0 30px;

  border-radius: 14px;
  border: none;

  background: #0f3b66;

  color: white;
  font-size: 18px;
  font-weight: 600;

  cursor: pointer;

  box-shadow:
    0 8px 18px rgba(0,0,0,0.18);
}

.event-box {
  height: 58px;
  min-width: 180px;

  padding: 0 22px;

  background: white;

  border-radius: 14px;

  display: flex;
  align-items: center;
  gap: 12px;

  font-size: 18px;
  color: #5d5d5d;
}

@media (max-width: 980px) {

  .hero {
    flex-direction: column;
    text-align: center;
  }

  .hero-buttons {
    justify-content: center;
  }
}

@media (max-width: 600px) {

  p {
    font-size: 18px;
  }

  .hero {
    padding-top: 60px;
  }
}
</style>