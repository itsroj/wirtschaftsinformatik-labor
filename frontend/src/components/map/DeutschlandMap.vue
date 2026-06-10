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
      <img src="@/assets/images/germany.svg" class="map" alt="Deutschland Karte" />

      <!-- Event Pins -->
      <EventMarker v-for="event in props.events" :key="event.id" :event="event" :isMobile="isMobile"
        @select="handleSelect" />

      <!-- BACKDROP -->
      <!-- BACKDROP (nur Desktop) -->
      <div v-if="selectedEvent && !isMobile" class="backdrop" @click="handleOutsideClick"></div>

      <div v-if="selectedEvent && !isMobile && sidebarPosition" class="sidebar-wrapper" :style="{
        left: sidebarPosition.x,
        top: sidebarPosition.y
      }" @click.stop>
        <EventSidebar :selected-event="selectedEvent" @goToList="scrollToList" />
      </div>

      <EventMobileSheet v-if="selectedEvent && isMobile" :event="selectedEvent" @close="store.clearSelectedEvent()"
        @goToList="handleMobileGoToList" />

      <!-- Verbindungslinie -->
      <div v-if="selectedEvent && !isMobile" class="connection-line" :style="lineStyle"></div>

    </div>

  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import EventMarker from './EventMarker.vue'
import EventSidebar from './EventSidebar.vue'
import EventMobileSheet from './EventMobileSheet.vue'
import { useEventsStore } from '@/stores/useEventsStore'
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

const store = useEventsStore()

const handleOutsideClick = () => {
  store.clearSelectedEvent()
}

const scrollToList = () => {
  const id = store.selectedEventId
  if (!id) return

  document.getElementById(`event-${id}`)
    ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const selectedEvent = computed(() => store.selectedEvent)

// Berechne Sidebar-Position direkt aus dem Event
const sidebarPosition = computed(() => {
  if (!selectedEvent.value) return null

  const posStyle = getEventPosition(selectedEvent.value.city)
  return {
    x: posStyle.left,
    y: `calc(${posStyle.top} + 40px)`
  }
})

const isMobile = ref(false)


const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 900
}


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

const handleSelect = (data) => {
  const event = data.event || data
  store.setSelectedEvent(event.id)
}

const handleMobileGoToList = () => {
  scrollToList()
  store.clearSelectedEvent()
}
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
  color: rgba(255, 255, 255, 0.9);
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

/* Marker über Backdrop */
.marker {
  z-index: 30;
}

/* Backdrop unter Sidebar aber über Map */
.backdrop {
  position: absolute;
  inset: 0;
  z-index: 10;
  background: transparent;
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
  background: rgba(15, 59, 102, 0.3);
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

/* Sidebar Wrapper - dynamische Positionierung */
.sidebar-wrapper {
  position: absolute;
  z-index: 40;
  transform: translateX(-50%);
  max-width: 90%;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* Sidebar - verbesserte Optik */
.sidebar {
  background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.98),
      rgba(255, 255, 255, 0.92));
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 32px;
  min-width: 300px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.15),
    0 0 1px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.6);
  z-index: 20;
  will-change: transform;
  transform: translateZ(0);
  animation: sidebarFade 0.35s ease;
  transition: opacity 0.2s ease, transform 0.2s ease;
  backface-visibility: hidden;
}

.connection-line {
  position: absolute;

  height: 2px;

  background:
    linear-gradient(to right,
      rgba(194, 199, 205, 0.9),
      rgba(15, 59, 102, 0.15));

  z-index: 15;

  pointer-events: none;
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
      translateY(-50%) translateX(30px) translateZ(0);
  }

  to {
    opacity: 1;
    transform:
      translateY(-50%) translateX(0) translateZ(0);
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