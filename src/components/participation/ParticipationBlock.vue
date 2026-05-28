<template>

  <section class="block">

    <div class="content">

      <h2>{{ title }}</h2>

      <div class="text">

        <p v-for="(t, i) in text" :key="i">
          {{ t }}
        </p>

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
  title: String,
  text: Array,

  // statt nur image:
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

@media (max-width: 1100px) {

  .block {
    flex-direction: column;
  }

  .image {
    width: 100%;
  }
}

</style>