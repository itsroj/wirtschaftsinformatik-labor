<template>

  <section class="info-card">

    <h2>
      {{ languageStore.t('munInfoLinks.title') }}
    </h2>

    <br>

    <ul>

      <li>
        <a
          href="https://de.wikipedia.org/wiki/Model_United_Nations"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ languageStore.t('munInfoLinks.wikipedia') }}
        </a>
      </li>

      <li>
        <a
          href="https://galerie.dmun.de/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ languageStore.t('munInfoLinks.dmunGallery') }}
        </a>
        {{ languageStore.t('munInfoLinks.dmunGalleryDescription') }}
      </li>

      <li>
        <a
          href="https://junges-uno-netzwerk.de/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ languageStore.t('munInfoLinks.jungesUnoNetzwerk') }}
        </a>
        {{ languageStore.t('munInfoLinks.jungesUnoNetzwerkDescription') }}
      </li>

    </ul>

  </section>

</template>

<script setup>
import { useLanguageStore } from '@/stores/useLanguageStore'

const languageStore = useLanguageStore()
</script>

<style scoped>

.info-card {
  flex: 0.7;

  background: linear-gradient(
  to bottom,
  rgba(255,255,255,0.96),
  rgba(255,255,255,0.88)
  );

  border-radius: 24px;

  padding: 60px;

/*  backdrop-filter: blur(12px); */

  box-shadow:
    0 12px 30px rgba(0,0,0,0.1);
}

h2 {
  margin-bottom: 30px;

  font-size: 2rem;
}

ul {
  display: flex;
  flex-direction: column;

  gap: 28px;

  list-style: none;

  padding: 0;

  margin: 0;
}

li {
  line-height: 1.65;

  color: #2d2d2d;
}

a {
  color: #1b1b1b;

  font-weight: 600;

  text-decoration: none;

  border-bottom: 2px solid #1b1b1b;

  transition:
    opacity 0.2s ease;
}

a:hover {
  opacity: 0.7;
}

@media (max-width: 1100px) {

  .info-card {
    flex: 1;
  }
}

</style>