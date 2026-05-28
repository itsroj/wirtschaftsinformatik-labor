<template>
  <section class="map-wrapper">

    <!-- Header -->
    <div class="map-header">
      <!-- <h2>Interaktive MUN-Karte</h2>
      <p>Alle Konferenzen in Deutschland</p> -->
    </div>

    <!-- Map Container -->
    <div class="map-container" :class="{ small: props.size === 'small' }">

      <!-- SVG Map -->
      <img
        src="@/assets/images/germany.svg"
        class="map"
        alt="Deutschland Karte"
      />

      <!-- Event Pins -->
      <EventMarker
        v-for="event in props.events"
        :key="event.id"
        :event="event"
        :isMobile="isMobile"
        @select="selectEvent"
      />

            <!-- Verbindungslinie -->
      <div
        v-if="selectedEvent && !isMobile"
        class="connection-line"
        :style="lineStyle"
      ></div>


    

      <!-- Sidebar -->
      <div
        class="sidebar"
        v-if="selectedEvent && !isMobile"
        :style="sidebarStyle"

        @mouseenter="isHoveringSidebar = true"
        @mouseleave="
          isHoveringSidebar = false;
          selectEvent(null)
        "
      >

        <h3>{{ selectedEvent.title }}</h3>

        <p>{{ selectedEvent.city }}</p>

        <p>{{ selectedEvent.date }}</p>

      </div>

      <!-- Mobile Bottom Sheet -->
      <div
        v-if="selectedEvent && isMobile"
        class="bottom-sheet"

        @touchstart="startDrag"
        @touchmove="onDrag"
        @touchend="endDrag"

        :style="sheetStyle"
      >
        <div class="handle"></div>

        <h3>{{ selectedEvent.title }}</h3>
        <p>{{ selectedEvent.city }}</p>
        <p>{{ selectedEvent.date }}</p>
      </div>

    </div>
    


  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import EventMarker from './EventMarker.vue'
import { getEventPosition } from '@/utils/cityCoordinates'

const props = defineProps({
  events: {
    type: Array,
    default: () => []
  },
  size: {
    type: String,
    default: 'large'
  }
})

const selectedEvent = ref(null)

// NEU: kontrolliert ob Sidebar offen bleiben darf
const isHoveringSidebar = ref(false)

const dragY = ref(0)
const startY = ref(0)
const isDragging = ref(false)

const startDrag = (e) => {
  startY.value = e.touches[0].clientY
  isDragging.value = true
}

const onDrag = (e) => {
  if (!isDragging.value) return

  const currentY = e.touches[0].clientY
  const diff = currentY - startY.value

  if (diff > 0) {
    dragY.value = diff
  }
}

const endDrag = () => {
  isDragging.value = false

  // 👉 Threshold: 120px runterziehen = close
  if (dragY.value > 120) {
    selectedEvent.value = null
  }

  // Reset animation
  dragY.value = 0
}

// NEU: Delay gegen Flackern
let hoverTimeout = null

const isMobile = ref(false)

const selectEvent = (event) => {

  clearTimeout(hoverTimeout)

  if (!event) {
    hoverTimeout = setTimeout(() => {

      // nur schließen wenn NICHT über Sidebar gehovert wird
      if (!isHoveringSidebar.value) {
        selectedEvent.value = null
      }

    }, 120)

    return
  }

  selectedEvent.value = event
}

const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 900
}

/**
 * Positionierung der Pins (prozentual!)
 * → später aus Backend ersetzbar
 */
const getPosition = (event) => {
  return {
    top: event.top,
    left: event.left
  }
}
/**
 * Automatische Position aus Stadt-Namen
 */
const getAutoPosition = (event) => {
  const position = cityPositions[event.city]
  
  if (position) {
    return position
  }
  
  // Fallback wenn Stadt nicht im Mapping
  console.warn(`Stadt nicht gefunden: ${event.city}`)
  return { top: "50%", left: "50%" }
}


const sheetStyle = computed(() => ({
  transform: `translateY(${dragY.value}px)`,
  transition: isDragging.value ? 'none' : 'transform 0.25s ease'
}))

const lineStyle = computed(() => {

  if (!selectedEvent.value) return {}

  const position = getEventPosition(selectedEvent.value.city)
  const leftValue = parseFloat(position.left)
  const showLeft = leftValue > 55

  return {
    top: position.top,

    left: showLeft
      ? `calc(${position.left} - 240px)`
      : position.left,

    width: '240px',

    transform: 'translateY(-50%)'
  }
})

const sidebarStyle = computed(() => {

  if (!selectedEvent.value) return {}

  const position = getEventPosition(selectedEvent.value.city)
  const leftValue = parseFloat(position.left)
  const showLeft = leftValue > 55

  if (isMobile.value) {
    return {
      top: `calc(${position.top} - 220px)`,
      left: position.left,
      transform: 'translateX(-50%)'
    }
  }

  return {
    top: position.top,
    left: showLeft ? `calc(${position.left} - 360px)` : `calc(${position.left} + 80px)`,
    transform: 'translateY(-50%)'
  }
})


onMounted(() => {

  checkScreenSize()

  window.addEventListener(
    'resize',
    checkScreenSize
  )
})

onUnmounted(() => {

  window.removeEventListener(
    'resize',
    checkScreenSize
  )
})

</script>

<style>
.map-wrapper {
  width: min(1450px, 92%);
  margin: auto;
  padding-top: 60px;
  padding-bottom: 60px;
}

.map-header {
  text-align: center;
  margin-bottom: 50px;
}

.map-header h2 {
  color: white;
  font-size: clamp(36px, 4vw, 60px);
  font-weight: 800;
}

.map-header p {
  color: rgba(255,255,255,0.9);
  margin-top: 12px;
}

.map-container {
  position: relative;
  width: 50%;
  max-width: 1100px;
  margin: auto;

  z-index: 1;
  border-radius: 30px;
}

.map-container.small {
  width: 35%;
  max-width: 800px;
}

.map {
  width: 100%;
  object-fit: contain;
  display: block;

}

/* 🔥 PIN STYLE */
.pin {
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.dot {
  width: 14px;
  height: 14px;
  background: #0f3b66;
  border-radius: 50%;
  z-index: 2;
}

/* Puls Animation */
.pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  background: rgba(15,59,102,0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 1.8s infinite;
}

@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
  100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
}

/* Sidebar */
.sidebar {
  position: absolute;

  width: 200px;

  background: linear-gradient(
  to bottom,
  rgba(255,255,255,0.96),
  rgba(255,255,255,0.88)
  );

/*  backdrop-filter: blur(4px); */

  padding: 28px;

  border-radius: 26px;

  box-shadow:
    0 25px 60px rgba(0,0,0,0.12);

  z-index: 20;

  will-change: transform;

  transform:
    translateY(-50%)
    translateZ(0);

  animation:
    sidebarFade 0.35s ease;

  transition: opacity 0.2s ease, transform 0.2s ease;

  backface-visibility: hidden;
}

.connection-line {
  position: absolute;

  height: 2px;

  background:
    linear-gradient(
      to right,
      rgba(194, 199, 205, 0.9),
      rgba(15,59,102,0.15)
    );

  z-index: 15;

  pointer-events: none;
}

.bottom-sheet {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  background: linear-gradient(
  to bottom,
  rgba(255,255,255,0.96),
  rgba(255,255,255,0.88)
  );
  /* backdrop-filter: blur(12px); */

  border-top-left-radius: 24px;
  border-top-right-radius: 24px;

  padding: 20px 24px;

  box-shadow: 0 -10px 40px rgba(0,0,0,0.15);

  z-index: 9999;

  animation: slideUp 0.3s ease;

  touch-action: none;
}

.handle {
  width: 50px;
  height: 5px;

  background: #ccc;
  border-radius: 999px;

  margin: 0 auto 12px auto;
}

@media (max-width: 900px) {

  .map-container {
    width: 90%;
  }

  .map-container.small {
    width: 80%;
    max-width: none;
  }

  .sidebar {

    width: 260px;

    padding: 20px;

    border-radius: 22px;
  }
}


@keyframes sidebarFade {

  from {
    opacity: 0;
    transform:
      translateY(-50%)
      translateX(30px)
      translateZ(0);
  }

  to {
    opacity: 1;
    transform:
      translateY(-50%)
      translateX(0)
      translateZ(0);
  }
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

</style>