<template>
  <section class="map-wrapper">
    
    <div class="map-header">

      <!-- <h2>
        Interaktive MUN-Karte
      </h2>

      <p>
        Entdecke Konferenzen in ganz Deutschland
      </p> -->

    </div> 
    <div class="map-layout">

      <!-- Karte -->
      <div class="map-container">
        <div class="map-inner">
            <l-map
            v-model:zoom="zoom"
            :center="center"
            >
            <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <l-marker
                v-for="event in events"
                :key="event.id"
                :lat-lng="[event.lat, event.lng]"
            >
                <l-popup>
                <EventPopup :event="event" />
                </l-popup>
            </l-marker>

            </l-map>
        </div>
      </div>

      <!-- Sidebar -->
      <EventSidebar
        :selected-event="selectedEvent"
      />

    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'


import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup
} from '@vue-leaflet/vue-leaflet'

import 'leaflet/dist/leaflet.css'

import events from '@/data/events'

import EventPopup from './EventPopup.vue'
import EventSidebar from './EventSidebar.vue'

const zoom = ref(6)

const center = ref([51.1657, 10.4515])

const selectedEvent = ref(null)

const selectEvent = (event) => {
  selectedEvent.value = event
}

onMounted(async () => {
  await nextTick()
  window.dispatchEvent(new Event('resize'))
})

</script>

<style scoped>
.map-wrapper {
  width: min(1450px, 92%);
  margin: auto;

  padding-top: 120px;
  padding-bottom: 120px;
}

.map-header {
  text-align: center;
  margin-bottom: 50px;
}

.map-header h2 {
  font-size: clamp(36px, 4vw, 58px);
  color: white;
  font-weight: 800;
}

.map-header p {
  margin-top: 16px;

  color: rgba(255,255,255,0.9);

  font-size: 20px;
}

.map-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 30px;

  height: 720px;
}

.map-container {
  height: 100%;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.18);
}

.map-inner {
  height: 100%;
  width: 100%;
}

:deep(.leaflet-container) {
  height: 100%;
  width: 100%;
}

@media (max-width: 1100px) {

  .map-layout {
    grid-template-columns: 1fr;
  }

  .map-container {
    height: 600px;
  }
}

@media (max-width: 700px) {

  .map-container {
    height: 450px;
  }
}
</style>