<template>
  <aside class="sidebar">

    <div v-if="selectedEvent">

      <div class="badge">
        {{ selectedEvent.city }}
      </div>

      <h3>
        {{ selectedEvent.title }}
      </h3>

      <div class="info">

        <div>
          📍 {{ selectedEvent.university }}
        </div>

        <div>
          📅 {{ formatEventDate(selectedEvent.date) }}
        </div>

        <div>
          👥 {{ selectedEvent.participants }} Teilnehmer
        </div>

      </div>

      <button @click="$emit('goToList')">
        Zur Konferenz
      </button>

    </div>

    <div
      v-else
      class="placeholder"
    >
      Wähle ein Event auf der Karte aus
    </div>

  </aside>
</template>

<script setup>
import { formatEventDate } from '@/utils/eventPresenter'

defineProps({
  selectedEvent: Object
})

</script>

<style scoped>
.sidebar {
  background: linear-gradient(
  to bottom,
  rgba(255,255,255,0.96),
  rgba(255,255,255,0.88)
);

  border-radius: 30px;

  padding: 30px;

  min-height: 720px;

/*  backdrop-filter: blur(10px); */

  box-shadow:
    0 15px 40px rgba(0,0,0,0.12);
}

.badge {
  display: inline-flex;

  padding: 8px 14px;

  border-radius: 999px;

  background: #d9eefc;

  color: #0b558f;

  font-weight: 600;
}

h3 {
  margin-top: 20px;

  font-size: 34px;
}

.info {
  margin-top: 30px;

  display: flex;
  flex-direction: column;
  gap: 18px;

  color: #4a4a4a;
}

button {
  margin-top: 40px;

  width: 100%;
  height: 58px;

  border: none;
  border-radius: 16px;

  background: #0f3b66;

  color: white;

  font-size: 17px;
  font-weight: 600;

  cursor: pointer;
}

.placeholder {
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;

  color: #7a7a7a;
}
</style>