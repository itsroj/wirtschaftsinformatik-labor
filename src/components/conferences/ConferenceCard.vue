<template>

  <article class="card">

    <!-- LEFT -->
    <div class="left">

      <!-- LOGO -->
      <div class="logo-wrapper">

        <img
          :src="event.logo"
          :alt="event.title"
        >

      </div>

      <!-- CONTENT -->
      <div class="content">

        <!-- HEADER -->
        <div class="top-row">

          <div>

            <h3>
              {{ event.title }}
            </h3>

            <p class="long-title">
              {{ event.longTitle }}
            </p>

          </div>

          <!-- TAGS -->
          <div class="tags">

            <span class="tag">
              {{ formatLanguage(event.language) }}
            </span>

            <span class="tag">
              {{ formatType(event.type) }}
            </span>

          </div>

        </div>

        <!-- META -->
        <div class="meta">

          <span>
             {{ event.city }}
          </span>

          <span>
             {{ event.participants }} Teilnehmende
          </span>

          <span>
             {{ event.date }} - {{ event.endDate }}
          </span>

        </div>

      </div>

    </div>

    <!-- RIGHT -->
    <div class="right">

      <a
        :href="event.website"
        target="_blank"
      >
        <button>
          Website
        </button>
      </a>

    </div>

  </article>

</template>

<script setup>

defineProps({
  event: Object
})

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
    mini: 'Mini MUN'
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

  gap: 20px;

  margin-top: 22px;

  color: #4f4f4f;

  font-size: 1rem;
}

/* RIGHT */
.right {
  flex-shrink: 0;
}

.right a {
  text-decoration: none;
}

.right button {
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

.right button:hover {
  transform: translateY(-2px);

  background:
    #184c80;
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