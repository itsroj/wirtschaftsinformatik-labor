<template>
  <section class="hero">

    <div class="hero-left">

      <h1>
        {{ languageStore.t('hero.title') }}
        <br>
        {{ languageStore.t('hero.titleLine2') }}
      </h1>

      <p>
        {{ languageStore.t('hero.subtitle') }}
        <br>
        {{ languageStore.t('hero.subtitleLine2') }}
      </p>

      <div class="hero-buttons">

        <RouterLink to="/konferenzen" class="primary-btn">
          {{ languageStore.t('hero.allConferences') }}
        </RouterLink>

        <div class="search-box">

          <input v-model="search" type="text" :placeholder="languageStore.t('hero.searchPlaceholder')"
            @keyup.enter="submitSearch" />

          <button @click="submitSearch">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 21L15.5 15.5M17 10.5C17 14.0899 14.0899 17 10.5 17C6.91015 17 4 14.0899 4 10.5C4 6.91015 6.91015 4 10.5 4C14.0899 4 17 6.91015 17 10.5Z"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>

        </div>

      </div>
    </div>

    <InfoCard />

  </section>
</template>

<script setup>
import InfoCard from './InfoCard.vue'
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
import { useLanguageStore } from '@/stores/useLanguageStore'

const languageStore = useLanguageStore()
const router = useRouter()
const search = ref('')

const submitSearch = () => {
  router.push({
    path: '/konferenzen',
    query: { search: search.value }
  })
}
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

  color: rgba(255, 255, 255, 0.92);

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
  text-decoration: none;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
}

.primary-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25);
  background: #124a80;
}

.primary-btn:active {
  transform: translateY(-1px);
}

.search-box {
  height: 58px;
  display: flex;
  align-items: center;

  background: white;
  border-radius: 14px;
  overflow: hidden;

  min-width: 260px;

  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
}

.search-box input {
  flex: 1;
  border: none;
  outline: none;

  padding: 0 16px;
  font-size: 16px;
}

.search-box button {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 58px;
  height: 58px;

  border: none;
  background: #cdcece;
  color: white;

  cursor: pointer;

  transition: background 0.2s ease;
}

.search-box button:hover {
  background: #124a80;
}

.search-icon {
  width: 20px;
  height: 20px;

  color: #4a4a4a;

  display: block;
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