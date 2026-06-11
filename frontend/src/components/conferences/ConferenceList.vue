<template>
  <section class="conference-list">

    <h2>
      {{ languageStore.t('konferenzen.title') }}
    </h2>

    <div class="list">

      <ConferenceCard v-for="event in events" :key="event.id" :event="event" :id="`event-${event.id}`" />

      <!-- Wird angezeigt, wenn Filter keine Treffer liefern -->
      <div v-if="events && events.length === 0" class="no-results">
        <span class="no-results-icon">🔍</span>
        <p>{{ languageStore.t('konferenzen.noResults') }}</p>
        <p class="no-results-hint">{{ languageStore.t('konferenzen.noResultsHint') }}</p>
      </div>

    </div>

  </section>
</template>

<script setup>
import ConferenceCard from './ConferenceCard.vue'
import { watch, nextTick } from 'vue'
import { useEventsStore } from '@/stores/useEventsStore'
import { useLanguageStore } from '@/stores/useLanguageStore'

defineProps({
  events: Array
})

const store = useEventsStore()
const languageStore = useLanguageStore()

// Reagiert auf scrollRequestId im Store: scrollt sanft zum Event-Element und
// hebt es kurz visuell hervor (highlight-Klasse für 1,5 Sekunden)
watch(() => store.scrollRequestId, async () => {
  const id = store.selectedEventId
  if (!id) return

  await nextTick()

  const el = document.getElementById(`event-${id}`)
  if (!el) return

  el.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  })

  el.classList.add('highlight')

  setTimeout(() => {
    el.classList.remove('highlight')
  }, 1500)
})
</script>

<style scoped>
.conference-list {
  background: linear-gradient(to bottom,
      rgba(255, 255, 255, 0.96),
      rgba(255, 255, 255, 0.88));

  border-radius: 26px;

  padding: 34px;

  /*  backdrop-filter: blur(12px); */

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.12);
}

h2 {
  margin-bottom: 30px;
}

.list {
  display: flex;
  flex-direction: column;

  gap: 18px;
}

.no-results {
  text-align: center;
  padding: 48px 24px;
}

.no-results-icon {
  font-size: 40px;
  display: block;
  margin-bottom: 12px;
}

.no-results p {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #374151;
}

.no-results-hint {
  margin-top: 6px !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  color: #9ca3af !important;
}
</style>