<template>

  <section class="conference-list">

    <h2>
      Konferenzen in Deutschland
    </h2>

    <div class="list">

      <ConferenceCard
        v-for="event in events"
        :key="event.id"
        :event="event"
      />

    </div>

  </section>

</template>

<script setup>
import ConferenceCard from './ConferenceCard.vue'

defineProps({
  events: Array
})
</script>

<style scoped>

.conference-list {
  background: linear-gradient(
  to bottom,
  rgba(255,255,255,0.96),
  rgba(255,255,255,0.88)
  );

  border-radius: 26px;

  padding: 34px;

/*  backdrop-filter: blur(12px); */

  box-shadow:
    0 10px 30px rgba(0,0,0,0.12);
}

h2 {
  margin-bottom: 30px;
}

.list {
  display: flex;
  flex-direction: column;

  gap: 18px;
}

</style>