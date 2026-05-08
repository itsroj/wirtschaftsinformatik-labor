<template>
  <div class="popup">

    <h3>{{ event.title }}</h3>

    <p>{{ event.city }}</p>

    <div class="meta">
      {{ event.date }}
    </div>

  </div>
</template>

<script setup>
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