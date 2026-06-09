<template>
  <div class="popup">
    <button class="close" @click="$emit('close')">×</button>

    <h3>{{ event.title }}</h3>
    <p>{{ event.city }}</p>
    <div class="meta">
    {{ formatEventDate(event.date) }}
    </div>

    <button @click="$emit('goToList')">
      Zur Konferenz
    </button>
  </div>
</template>

<script setup>
import { formatEventDate } from '@/utils/eventPresenter'

defineProps({
  event: Object
})

</script>

<style scoped>
.popup {
  min-width: 180px;
}

h3 {
  margin-bottom: 8px;
}

.meta {
  margin-top: 10px;
  color: #666;
}
</style>