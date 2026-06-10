<template>

  <article class="card" :id="`event-${event.id}`">

    <!-- LEFT -->
    <div class="left">

      <!-- LOGO -->
      <div class="logo-wrapper">

        <img :src="props.event.logo" :alt="props.event.title">

      </div>

      <!-- CONTENT -->
      <div class="content" @click="toggleCard">

        <!-- HEADER -->
        <div class="top-row">

          <div>

            <h3>
              {{ props.event.title }}
            </h3>

            <p class="long-title">
              {{ props.event.longTitle }}
            </p>

          </div>

          <!-- TAGS -->
          <div class="tags">

            <span class="tag">
              {{ formatLanguage(props.event.language) }}
            </span>

            <span class="tag">
              {{ formatType(props.event.type) }}
            </span>

          </div>

        </div>

        <!-- META -->
        <div class="meta">

          <!-- ROW 1 -->
          <div class="meta-row">

            <span class="meta-item">
              <MapPin :size="16" />
              {{ props.event.city }}
            </span>

            <span class="meta-item">
              <Users :size="16" />
              {{ props.event.participants }} {{ languageStore.t('konferenzen.card.participants') }}
            </span>

          </div>

          <!-- ROW 2 -->
          <div class="meta-row">
            <!-- Zeige erste Conference oder Event-Daten als Fallback -->
            <span class="meta-item">
              <Calendar :size="16" />
              {{ latestConferenceDisplay }}
            </span>

            <span v-if="latestApplicationDate" class="meta-item">
              <Clock :size="16" />
              {{ `${languageStore.t('konferenzen.card.applicationDeadline')}: ${latestApplicationDate}` }}
            </span>

          </div>

        </div>

        <!-- Hinweis: Klicken zum Aufklappen (nur wenn geschlossen) -->
        <div v-if="!isOpen" class="expand-hint">
          <span>{{ languageStore.t('konferenzen.card.expandHint') }}</span>
          <span class="chevron">›</span>
        </div>

        <!-- EXPANDED CONTENT -->
        <div v-if="isOpen" class="expanded">

          <p class="description">
            {{ localizedDescription }}
          </p>

          <p class="first-conference">
            {{ languageStore.t('konferenzen.card.firstConference') }}: {{ props.event.firstConference }}
          </p>

          <!-- CLOSE BUTTON -->
          <button class="close-btn" @click.stop="toggleCard">
            {{ languageStore.t('konferenzen.card.collapse') }}
          </button>

        </div>

      </div>

    </div>

    <!-- RIGHT -->
    <div class="right">

      <!-- Website -->
      <a :href="props.event.website" target="_blank">
        <button class="website-btn" @click.stop>
          {{ languageStore.t('konferenzen.card.website') }}
        </button>
      </a>

      <!-- Socials -->
      <SocialIcons :facebook="props.event.facebookLink" :instagram="props.event.instagramLink" />

    </div>

  </article>

</template>

<script setup>
import { ref, computed } from 'vue'
import { MapPin, Users, Calendar, Clock } from '@lucide/vue'
import SocialIcons from '@/components/icons/SocialIcons.vue'
import { useLanguageStore } from '@/stores/useLanguageStore'

const isOpen = ref(false)
const languageStore = useLanguageStore()

const props = defineProps({
  event: Object
})

const hasDescription = computed(() => !!(props.event?.description_de || props.event?.description_en || props.event?.description))

// Gibt die Beschreibung in der aktuellen Sprache zurück.
// Neue Struktur: description_de / description_en
// Fallback: altes description-Feld (für ältere Einträge)
const localizedDescription = computed(() => {
  const lang = languageStore.currentLanguage
  if (lang === 'en' && props.event?.description_en) return props.event.description_en
  if (props.event?.description_de) return props.event.description_de
  return props.event?.description || ''
})

const latestConference = computed(() => {
  // Versuche neueste Conference zu finden
  if (props.event?.conferences && props.event.conferences.length > 0) {
    const sorted = [...props.event.conferences].sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    )
    return sorted[0]
  }
  // Fallback zu Event-Daten für alte Events
  return {
    date: props.event?.date,
    endDate: props.event?.endDate,
    applicationDate: props.event?.applicationDate
  }
})

const latestConferenceDisplay = computed(() => {
  const conf = latestConference.value
  const start = formatDateOrNull(conf.date)
  const end = formatDateOrNull(conf.endDate)
  return start && end ? `${start} – ${end}` : start || '—'
})

const latestApplicationDate = computed(() => {
  const appDate = latestConference.value?.applicationDate
  return appDate ? formatDateOrNull(appDate) : null
})

const hasApplicationDate = computed(() => !!latestApplicationDate.value)

const toggleCard = () => {
  isOpen.value = !isOpen.value
}

const formatDateOrNull = (dateString) => {
  if (!dateString) return ''

  const locale = languageStore.currentLanguage === 'en' ? 'en-GB' : 'de-DE'
  return new Date(dateString).toLocaleDateString(locale)
}

/* FORMAT LANGUAGE */
// Liest den übersetzten Sprachnamen aus der Locale-Datei.
// DB-Werte: "de", "en", "both" → wird je nach Seitensprache übersetzt.
const formatLanguage = (language) => {
  const key = `konferenzen.card.language.${language}`
  const translated = languageStore.t(key)
  // Fallback: wenn kein Übersetzungsschlüssel gefunden, Originalwert anzeigen
  return translated !== key ? translated : language
}

/* FORMAT TYPE */
// Liest den übersetzten Typ aus der Locale-Datei.
// DB-Werte können variieren: "pupil"/"schueler", "student"/"studenten", "minimun"/"mini-mun"
const formatType = (type) => {
  const key = `konferenzen.card.type.${type}`
  const translated = languageStore.t(key)
  return translated !== key ? translated : type
}

</script>

<style scoped>
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 30px;

  padding: 30px;

  border-radius: 26px;

  background:
    rgba(255, 255, 255, 0.96);

  border:
    1px solid rgba(0, 0, 0, 0.08);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  box-shadow:
    0 10px 22px rgba(0, 0, 0, 0.08);

  will-change: transform;

  transform: translateZ(0);

  backface-visibility: hidden;
}

.card:hover {
  transform: translateY(-4px);

  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.12);
}

/* LEFT */
.left {
  display: flex;

  gap: 26px;

  flex: 1;
}

/* LOGO */
.logo-wrapper {
  width: 92px;
  height: 92px;

  border-radius: 22px;

  overflow: hidden;

  background:
    rgba(0, 0, 0, 0.04);

  display: flex;
  justify-content: center;
  align-items: center;

  flex-shrink: 0;
}

.logo-wrapper img {
  width: 80%;
  height: 80%;

  object-fit: contain;
}

/* CONTENT */
.content {
  flex: 1;
}

/* TOP ROW */
.top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  gap: 20px;
}

h3 {
  font-size: 1.55rem;

  color: #111;
}

.long-title {
  margin-top: 6px;

  color: #5a5a5a;

  font-size: 1rem;
}

/* TAGS */
.tags {
  display: flex;

  gap: 10px;

  flex-wrap: wrap;
}

.tag {
  padding:
    8px 14px;

  border-radius: 999px;

  background:
    rgba(15, 59, 102, 0.08);

  color:
    #0f3b66;

  font-size: 0.9rem;

  font-weight: 600;
}

/* META */
.meta {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  gap: 10px;

  margin-top: 22px;

  color: #4f4f4f;

  font-size: 1rem;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  color: #4f4f4f;
  font-size: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* RIGHT */
.right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  justify-content: flex-start;
}

.right a {
  text-decoration: none;
}

.website-btn {
  border: none;

  border-radius: 14px;

  padding:
    14px 24px;

  background:
    #0f3b66;

  color: white;

  font-weight: 600;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.website-btn:hover {
  transform: translateY(-2px);

  background:
    #184c80;
}

.social-buttons {
  display: flex;
  gap: 10px;
}

.expanded {
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  gap: 12px;

  animation: fadeIn 0.25s ease;
}

.description {
  color: #444;
  line-height: 1.5;
}

.first-conference {
  color: #666;
  font-size: 0.95rem;
}

.close-btn {
  align-self: flex-start;

  margin-top: 8px;

  padding: 8px 14px;
  border-radius: 10px;

  border: none;
  background: rgba(15, 59, 102, 0.1);
  color: #0f3b66;

  cursor: pointer;
}

.close-btn:hover {
  background: rgba(15, 59, 102, 0.18);
}

/* Hinweis zum Aufklappen */
.expand-hint {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 10px;
  font-size: 12px;
  font-weight: 500;
  color: #0b558f;
  opacity: 0.6;
  transition: opacity 0.2s ease;
  user-select: none;
}

.content:hover .expand-hint {
  opacity: 1;
}

.expand-hint .chevron {
  font-size: 16px;
  line-height: 1;
  display: inline-block;
  transform: rotate(90deg);
  transition: transform 0.2s ease;
}

.content:hover .expand-hint .chevron {
  transform: rotate(90deg) translateX(2px);
}

.highlight {
  animation: pulse 1.2s ease;
  outline: 2px solid #0f3b66;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.02);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}


/* MOBILE */
@media (max-width: 850px) {

  .card {
    flex-direction: column;

    align-items: flex-start;
  }

  .left {
    flex-direction: column;
  }

  .top-row {
    flex-direction: column;
  }

  .right {
    width: 100%;
  }

  .right button {
    width: 100%;
  }
}
</style>