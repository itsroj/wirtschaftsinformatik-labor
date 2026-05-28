<template>

  <article class="card">

    <!-- LEFT -->
    <div class="left">

      <!-- LOGO -->
      <div class="logo-wrapper">

        <img
          :src="props.event.logo"
          :alt="props.event.title"
        >

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
              {{ props.event.participants }} Teilnehmende
            </span>

          </div>

          <!-- ROW 2 -->
          <div class="meta-row">

            <span class="meta-item">
              <Calendar :size="16" />
              {{ formatDateOrNull(props.event.date) }} – {{ formatDateOrNull(props.event.endDate) }}
            </span>

            <span v-if="hasApplicationDate" class="meta-item">
              <Clock :size="16" />
              {{ `Anmeldeschluss: ${formatDateOrNull(props.event.applicationDate)}` }}
            </span>

          </div>

        </div>

          <!-- EXPANDED CONTENT -->
          <div v-if="isOpen" class="expanded">
            
            <p class="description">
              {{ props.event.description }}
            </p>

            <p class="first-conference">
              Erste Konferenz: {{ props.event.firstConference }}
            </p>

            <!-- CLOSE BUTTON -->
            <button class="close-btn" @click.stop="toggleCard">
              Einklappen
            </button>

          </div>

      </div>

    </div>

    <!-- RIGHT -->
    <div class="right">

      <!-- Website -->
      <a :href="props.event.website" target="_blank">
        <button class="website-btn" @click.stop>
          Website
        </button>
      </a>

      <!-- Socials -->
      <SocialIcons
        :facebook="props.event.facebookLink"
        :instagram="props.event.instagramLink"
      />

  </div>

  </article>

</template>

<script setup>
import { ref, computed } from 'vue'
import { MapPin, Users, Calendar, Clock} from '@lucide/vue'
import SocialIcons from '@/components/icons/SocialIcons.vue'

const isOpen = ref(false)

const props = defineProps({
  event: Object
})

const hasDescription = computed(() => !!props.event?.description)

const hasApplicationDate = computed(() => !!props.event?.applicationDate)

const toggleCard = () => {
  isOpen.value = !isOpen.value
}

const formatDateOrNull = (dateString) => {
  if (!dateString) return ''

  return new Date(dateString).toLocaleDateString('de-DE')
}

/* FORMAT LANGUAGE */
const formatLanguage = (language) => {

  const map = {
    english: 'Englisch',
    german: 'Deutsch'
  }

  return map[language] || language
}

/* FORMAT TYPE */
const formatType = (type) => {

  const map = {
    pupil: 'Schüler:innen',
    student: 'Studierende',
    minimun: 'Mini MUN'
  }

  return map[type] || type
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
    rgba(255,255,255,0.96);

  border:
    1px solid rgba(0,0,0,0.08);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  box-shadow:
    0 10px 22px rgba(0,0,0,0.08);

    will-change: transform;

    transform: translateZ(0);

    backface-visibility: hidden;
}

.card:hover {
  transform: translateY(-4px);

  box-shadow:
    0 20px 40px rgba(0,0,0,0.12);
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
    rgba(0,0,0,0.04);

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
    rgba(15,59,102,0.08);

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
  border-top: 1px solid rgba(0,0,0,0.08);

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
  background: rgba(15,59,102,0.1);
  color: #0f3b66;

  cursor: pointer;
}

.close-btn:hover {
  background: rgba(15,59,102,0.18);
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