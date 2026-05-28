<template>

  <section class="map-section">

    <DeutschlandMap
      :events="events"
    />

  </section>

</template>

<script setup>
import DeutschlandMap from '@/components/map/DeutschlandMap.vue'

defineProps({
  events: Array
})
</script>

<style scoped>

.map-section {
  height: 100%;
  min-height: 0;

  display: flex;

  background:
    rgba(255,255,255,0.04);
  border-radius: 30px;

  overflow: hidden;

}

</style>