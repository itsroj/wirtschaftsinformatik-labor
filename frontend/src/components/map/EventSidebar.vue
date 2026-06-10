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
  width: 320px;

  background: linear-gradient(
    to bottom,
    rgba(255,255,255,0.96),
    rgba(255,255,255,0.88)
  );

  border-radius: 28px;

  padding: 28px;

  box-shadow:
    0 15px 40px rgba(0,0,0,0.12);

  display: flex;
  flex-direction: column;
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
  margin-top: 18px;

  font-size: 24px;
  line-height: 1.25;

  color: #0f3b66;
}

.info {
  margin-top: 24px;

  display: flex;
  flex-direction: column;
  gap: 14px;

  color: #4a4a4a;

  font-size: 15px;
}

button {
  margin-top: 28px;

  width: 100%;
  height: 54px;

  border: none;
  border-radius: 16px;

  background: #0f3b66;
  color: white;

  font-size: 16px;
  font-weight: 600;

  cursor: pointer;

  transition:
    transform .2s ease,
    background .2s ease;
}

button:hover {
  background: #144a80;
  transform: translateY(-1px);
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