<template>
  <div class="marker" :style="positionStyle" @click.stop="handleClick">

    <!-- Punkt -->
    <div class="dot"></div>

    <!-- Puls Animation -->
    <div class="pulse"></div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getEventPosition } from '@/utils/cityCoordinates'

const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  isMobile: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['hover', 'select'])

/**
 * Position automatisch aus Stadt-Namen berechnen
 */
const positionStyle = computed(() => {
  return getEventPosition(props.event.city)
})

const handleClick = () => {
  emit('select', props.event)
}
</script>

<style scoped>
.marker {
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 5;
}

/* 🔵 Mittelpunkt */
.dot {
  width: 14px;
  height: 14px;
  background: #c1c4c7;
  border-radius: 50%;
  z-index: 2;

  transition: transform 0.2s ease;
}

/* Hover Effekt */
.marker:hover .dot {
  transform: scale(1.3);
}

.marker:hover {
  z-index: 20;
}

/* 🌊 Puls Animation */
.pulse {
  position: absolute;
  top: 50%;
  left: 50%;

  width: 30px;
  height: 30px;

  background: rgba(221, 232, 244, 0.3);
  border-radius: 50%;

  transform: translate(-50%, -50%);
  animation: pulse 1.8s infinite;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.7;
  }

  100% {
    transform: translate(-50%, -50%) scale(2.5);
    opacity: 0;
  }
}
</style>