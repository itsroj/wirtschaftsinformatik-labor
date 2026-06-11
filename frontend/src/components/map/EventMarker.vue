<template>
  <!--
    EventMarker: Ein einzelner klickbarer Pin auf der Deutschlandkarte.
    Wird von DeutschlandMap.vue für jedes Event mit v-for gerendert.
    - Die Position wird automatisch aus dem Stadtnamen berechnet
    - @click.stop verhindert, dass der Klick zum Backdrop durchläuft
    - isSubMarker: kleinerer Pin ohne Puls, für erweiterte Stadt-Gruppe
    - count: zeigt Zahlen-Badge bei mehreren Events in einer Stadt
    - offsetX: horizontale Pixel-Verschiebung für Sub-Pins nebeneinander
  -->
  <div class="marker" :class="{ 'sub-marker': isSubMarker }" :style="markerStyle" @click.stop="handleClick">

    <!-- Der sichtbare Punkt des Pins -->
    <div class="dot"></div>

    <!-- Animierter Puls-Ring -->
    <div class="pulse"></div>

    <!-- Zahlen-Badge: erscheint wenn mehrere Events in dieser Stadt -->
    <div v-if="count > 1" class="count-badge">{{ count }}</div>

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
  },
  // Anzahl der Events in dieser Stadt (für Badge-Anzeige)
  count: {
    type: Number,
    default: 1
  },
  // true = Sub-Pin (kleiner, kein Puls, andere Farbe)
  isSubMarker: {
    type: Boolean,
    default: false
  },
  // Horizontale Pixel-Verschiebung für nebeneinander stehende Sub-Pins
  offsetX: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['select'])

// Kombiniert die geografische Position mit dem optionalen horizontalen Offset
const markerStyle = computed(() => {
  const pos = getEventPosition(props.event.city)
  const transform = props.offsetX !== 0
    ? `translate(calc(-50% + ${props.offsetX}px), -50%)`
    : 'translate(-50%, -50%)'
  return { ...pos, transform }
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

/* Sub-Pin: höherer z-index damit er über dem Haupt-Pin liegt */
.sub-marker {
  z-index: 15;
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

/* Sub-Pin Dot: gleiche Größe und Farbe wie normale Pins */
.sub-marker .dot {
  width: 14px;
  height: 14px;
  background: #c1c4c7;
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

/* Zahlen-Badge rechts oben am Pin */
.count-badge {
  position: absolute;
  top: -8px;
  right: -10px;
  min-width: 16px;
  height: 16px;
  padding: 0 3px;
  background: #2677b5;
  color: white;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  pointer-events: none;
}
</style>