<template>
  <!--
    EventMarker: Ein einzelner klickbarer Pin auf der Deutschlandkarte.
    Wird von DeutschlandMap.vue für jedes Event mit v-for gerendert.
    - Die Position wird automatisch aus dem Stadtnamen berechnet
    - @click.stop verhindert, dass der Klick zum Backdrop durchläuft
  -->
  <div class="marker" :style="positionStyle" @click.stop="handleClick">

    <!-- Der sichtbare Punkt des Pins -->
    <div class="dot"></div>

    <!-- Animierter Puls-Ring um den Punkt -->
    <div class="pulse"></div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getEventPosition } from '@/utils/cityCoordinates'

// Props: Das Event-Objekt mit allen Daten (Pflichtfeld)
// isMobile wird übergeben, hat aber aktuell keinen eigenen Effekt im Marker selbst
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

// "select" wird nach oben an DeutschlandMap.vue gesendet, wenn der Pin geklickt wird
const emit = defineEmits(['select'])

// Berechnet die CSS-Position (left/top in %) aus dem Stadtnamen des Events.
// getEventPosition schaut in einer Koordinaten-Tabelle nach und rechnet
// die geografischen Koordinaten in Prozentwerte um.
const positionStyle = computed(() => {
  return getEventPosition(props.event.city)
})

// Wenn der Pin angeklickt wird, senden wir das gesamte Event-Objekt nach oben
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