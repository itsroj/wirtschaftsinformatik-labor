<template>
  <section class="map-wrapper">

    <!-- Optionaler Header – aktuell ausgeblendet -->
    <div class="map-header">
      <!-- <h2>Interaktive MUN-Karte</h2>
      <p>Alle Konferenzen in Deutschland</p> -->
    </div>

    <!--
      map-container ist "position: relative", damit die Pins und Sidebar
      mit "position: absolute" relativ zur Karte positioniert werden können.
      Die CSS-Klasse "small" wird hinzugefügt, wenn size="small" übergeben wird.
    -->
    <div class="map-container" :class="{ small: props.size === 'small' }">

      <!-- Das Kartenbild als Hintergrund -->
      <img src="@/assets/images/germany.svg" class="map" alt="Deutschland Karte" />

      <!--
        Für jedes Event in der Liste wird ein EventMarker-Pin auf der Karte gerendert.
        :key hilft Vue, die Elemente effizient zu verwalten.
        Wenn ein Pin angeklickt wird, feuert er das "select"-Event → handleSelect()
      -->
      <EventMarker v-for="event in props.events" :key="event.id" :event="event" :isMobile="isMobile"
        @select="handleSelect" />

      <!--
        Backdrop (nur Desktop): unsichtbare Fläche über der gesamten Karte.
        Wenn der Nutzer außerhalb der Sidebar klickt, schließt sich diese.
      -->
      <div v-if="selectedEvent && !isMobile" class="backdrop" @click="handleOutsideClick"></div>

      <!--
        Sidebar (nur Desktop): erscheint, wenn ein Event ausgewählt ist UND
        die Position berechnet wurde. Position wird dynamisch per :style gesetzt.
        @click.stop verhindert, dass ein Klick IN der Sidebar den Backdrop auslöst.
      -->
      <div v-if="selectedEvent && sidebarPosition && !isMobile" class="sidebar-wrapper"
        :style="{ left: sidebarPosition.x, top: sidebarPosition.y }" @click.stop>
        <EventSidebar :selected-event="selectedEvent" @goToList="scrollToList" />
      </div>

      <!--
        Mobile Sheet: Auf kleinen Bildschirmen wird statt der Sidebar
        ein Sheet von unten eingeblendet (wie eine App-Schublade).
        @close → Event schließen, @goToList → zur Konferenz-Liste scrollen
      -->
      <EventMobileSheet v-if="selectedEvent && isMobile" :event="selectedEvent" @close="store.clearSelectedEvent()"
        @goToList="handleMobileGoToList" />

    </div>

  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import EventMarker from './EventMarker.vue'
import EventSidebar from './EventSidebar.vue'
import EventMobileSheet from './EventMobileSheet.vue'
import { useEventsStore } from '@/stores/useEventsStore'
import { getEventPosition } from '@/utils/cityCoordinates'

// Props, die von der Elternkomponente übergeben werden:
// - events: Liste aller Events, die auf der Karte angezeigt werden sollen
// - size: "large" (Standard) oder "small" für die Kartengröße
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

// Pinia-Store: verwaltet zentral das aktuell ausgewählte Event
const store = useEventsStore()
const router = useRouter()
const route = useRoute()

// Das aktuell ausgewählte Event – wird aus dem Store geholt (reaktiv)
const selectedEvent = computed(() => store.selectedEvent)

// Position der Sidebar auf der Karte (x = links, y = oben)
// null = Sidebar wird nicht angezeigt
const sidebarPosition = ref(null)

// true wenn Bildschirmbreite ≤ 900px (Mobilansicht)
const isMobile = ref(false)

// Wird aufgerufen, wenn der Nutzer neben die Sidebar klickt (Backdrop-Klick)
const handleOutsideClick = () => {
  sidebarPosition.value = null
  store.clearSelectedEvent()
}

// Navigiert zur Konferenz-Karte in der Liste.
// Wenn wir bereits auf der Konferenzen-Seite sind → direkt scrollen.
// Wenn wir auf einer anderen Seite sind (z.B. Homepage) → zu /konferenzen
// navigieren und ?highlight=id als Query-Parameter mitgeben.
// KonferenzenView liest diesen Parameter nach dem Event-Laden aus und scrollt.
const scrollToList = () => {
  const id = store.selectedEventId
  if (!id) return

  if (route.name === 'konferenzen') {
    // Bereits auf der Konferenzen-Seite: scrollRequestId erhöhen → Watcher reagiert
    store.setSelectedEvent(id, { scroll: true })
  } else {
    // Andere Seite (z.B. Homepage): mit highlight-Parameter navigieren
    router.push({ name: 'konferenzen', query: { highlight: id } })
  }
}

// Prüft beim Laden und bei jedem Resize, ob wir im Mobilmodus sind
const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 900
}

// Wird aufgerufen, wenn ein Pin auf der Karte angeklickt wird.
// 1. Berechnet die Sidebar-Position aus dem Stadtname
// 2. Speichert das ausgewählte Event im Store
const handleSelect = (data) => {
  // data kann direkt ein Event-Objekt sein oder { event: ... } enthalten
  const event = data.event || data

  if (event && event.city) {
    // getEventPosition gibt CSS-Werte zurück, z.B. { left: "45%", top: "30%" }
    const posStyle = getEventPosition(event.city)
    sidebarPosition.value = {
      x: posStyle.left,
      y: `calc(${posStyle.top} + 50px)` // etwas nach unten versetzt
    }
  }

  // Event im Store speichern → selectedEvent computed wird automatisch aktualisiert
  store.setSelectedEvent(event.id)
}

// Mobile: Zur Liste scrollen und dann das Sheet schließen
const handleMobileGoToList = () => {
  scrollToList()
  store.clearSelectedEvent()
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  // Event-Listener aufräumen, damit kein Memory-Leak entsteht
  window.removeEventListener('resize', checkScreenSize)
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