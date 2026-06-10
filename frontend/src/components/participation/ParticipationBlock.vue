<template>

  <section
    class="block"
    :id="id"
  >

    <div class="content">

      <h2>{{ title }}</h2>

      <div class="text">

        <div
          v-for="(t, i) in text"
          :key="i"
          v-html="t"
          class="text-item"
        ></div>

      </div>

    </div>

    <div class="image" :class="{ reverse }">

        <!-- SINGLE IMAGE -->
        <img
            v-if="images.length === 1"
            :src="images[0]"
            alt="Block Image"
        />

        <!-- GALLERY -->
        <div v-else class="gallery">

            <img
            v-for="(img, i) in images"
            :key="i"
            :src="img"
            alt="Gallery Image"
            />

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

</script>

<style scoped>

.block {
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 60px;

  background: rgba(255,255,255,0.94);
  border-radius: 28px;

  padding: 60px;

  box-shadow: 0 8px 18px rgba(0,0,0,0.08);
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
  gap: 18px;

  line-height: 1.6;
  color: #2d2d2d;
}

.image {
  width: 260px;
  flex-shrink: 0;
}

.image img {
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 8px 22px rgba(0,0,0,0.12);
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

  box-shadow: 0 8px 22px rgba(0,0,0,0.12);
}

.text-item {
  margin-bottom: 18px;
  line-height: 1.6;
  color: #2d2d2d;
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
  margin: 0px 0;
}

:deep(.link-card a) {
  display: inline-flex;
  align-items: center;

  padding: 6px 10px;
  border-radius: 10px;

  background: rgba(79, 169, 227, 0.08);
  border: 1px solid rgba(79, 169, 227, 0.18);

  color: #0e0e0e;
  font-weight: 500;
  font-size: 0.92rem;

  text-decoration: none;

  transition: all 0.2s ease;
}

:deep(.link-card a:hover) {
  background: rgba(79, 169, 227, 0.22);
  transform: translateY(-1px);
}

@media (max-width: 1100px) {

  .block {
    flex-direction: column;
  }

  .image {
    width: 100%;
  }
}

</style>