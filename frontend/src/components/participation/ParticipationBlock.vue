<template>

  <section class="block" :id="id">

    <div class="content">

      <h2>{{ title }}</h2>

      <div class="text">

        <div v-for="(t, i) in text" :key="i" v-html="t" class="text-item"
          :class="{ 'is-link': t.includes('link-card'), 'is-text': !t.includes('link-card') }"></div>

      </div>

    </div>

    <div class="image" :class="{ reverse }">

      <!-- SINGLE IMAGE -->
      <img v-if="images.length === 1" :src="images[0]" alt="Block Image" />

      <!-- GALLERY -->
      <div v-else class="gallery">

        <img v-for="(img, i) in images" :key="i" :src="img" alt="Gallery Image" />

      </div>

    </div>
  </section>

</template>

<script setup>

defineProps({
  id: String,

  title: String,
  text: Array,
  images: Array,

  reverse: Boolean
})

import { useThemeStore } from '@/stores/useThemeStore'
const themeStore = useThemeStore()

</script>

<style scoped>
.block {
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 60px;

  background: rgba(255, 255, 255, 0.94);
  border-radius: 28px;

  padding: 60px;

  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
}

.content {
  flex: 1;
}

h2 {
  font-size: 2rem;
  margin-bottom: 30px;
}

.text {
  display: flex;
  flex-direction: column;
  gap: 12px;

  line-height: 1.6;
  color: #2d2d2d;
}

.image {
  width: 260px;
  max-width: 100%;
  flex-shrink: 1;
  min-width: 0;
}

.image img {
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.12);
}

/* reverse layout */
.reverse {
  order: -1;
}

.gallery {
  display: grid;

  grid-template-columns: 1fr;
  gap: 14px;
}

.gallery img {
  width: 100%;
  border-radius: 16px;
  object-fit: cover;

  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.12);
}

.text-item {
  line-height: 1.6;
  color: #2d2d2d;
}

/* Spacing between first block (links) and second block (text) */
.text-item.is-link+.text-item.is-text {
  margin-top: 28px;
}

/* 👇 wichtig: deep selector */
.text :deep(a) {
  color: #0f3b66;
  text-decoration: none;

  border-bottom: 1px solid rgba(15, 59, 102, 0.4);
  font-weight: 600;

  transition: all 0.2s ease;
}

.text :deep(a:hover) {
  opacity: 0.7;
  border-bottom-color: rgba(15, 59, 102, 0.9);
}

/* 👇 wichtig: deep selector */
:deep(.link-card) {
  margin: 2px 0;
}

:deep(.link-card a) {
  display: inline-flex;
  align-items: center;

  padding: 6px 10px;
  border-radius: 10px;

  background: rgba(79, 169, 227, 0.08);
  border: 1px solid rgba(79, 169, 227, 0.18);

  color: v-bind('themeStore.isDark ? "#dde9f5" : "#0e0e0e"');
  font-weight: 500;
  font-size: 0.92rem;

  text-decoration: none;

  transition: all 0.2s ease;
}

:deep(.link-card a:hover) {
  background: rgba(79, 169, 227, 0.22);
  transform: translateY(-1px);
}

/* Dark Mode: handled via v-bind in :deep(.link-card a) */

@media (max-width: 1200px) {
  .block {
    padding: 40px;
    gap: 40px;
  }

  .image {
    width: 200px;
  }

  h2 {
    font-size: 1.6rem;
  }
}

@media (max-width: 900px) {
  .block {
    padding: 30px;
    gap: 30px;
  }

  .image {
    width: 150px;
  }

  h2 {
    font-size: 1.4rem;
  }
}

@media (max-width: 768px) {
  .block {
    flex-direction: column;
    padding: 25px;
    gap: 25px;
  }

  .image {
    width: 100%;
    max-width: 400px;
  }

  h2 {
    font-size: 1.3rem;
    margin-bottom: 20px;
  }

  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .block {
    padding: 15px;
    gap: 20px;
  }

  .image {
    width: 100%;
    max-width: 100%;
  }

  h2 {
    font-size: 1.1rem;
    margin-bottom: 15px;
  }

  .text {
    gap: 8px;
    font-size: 0.9rem;
  }

  .gallery {
    grid-template-columns: 1fr;
  }
}
</style>