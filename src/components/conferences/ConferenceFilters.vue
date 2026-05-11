<template>

  <aside class="filters">

    <h2>Suche</h2>

    <input
      type="text"
      placeholder="257 Events"
      :value="search"
      @input="$emit('update-search', $event.target.value)"
    >

    <!-- SORTING -->
<div class="section">

  <h3>Sortierung</h3>

  <div class="sort-group">

    <!-- DATE -->
    <div class="sort-row">

      <span>Datum</span>

      <div class="sort-buttons">

        <button @click="$emit('sort', { key: 'date', direction: 'asc' })">
          ↑
        </button>

        <button @click="$emit('sort', { key: 'date', direction: 'desc' })">
          ↓
        </button>

      </div>

    </div>

    <!-- PARTICIPANTS -->
    <div class="sort-row">

      <span>Teilnehmende</span>

      <div class="sort-buttons">

        <button @click="$emit('sort', { key: 'participants', direction: 'asc' })">
          ↑
        </button>

        <button @click="$emit('sort', { key: 'participants', direction: 'desc' })">
          ↓
        </button>

      </div>

    </div>

  </div>

</div>

    <div class="section">

      <h3>Filter</h3>

      <div class="filter-group">

        <button
          @click="$emit('toggle-type', 'student')"
        >
          Studierende
        </button>

        <button
          @click="$emit('toggle-type', 'school')"
        >
          Schüler:innen
        </button>

        <button
          @click="$emit('toggle-type', 'mini')"
        >
          Mini MUNs
        </button>

      </div>

    </div>

    <div class="section">

      <h3>Sprache</h3>

      <div class="filter-group">

        <button
          @click="$emit('toggle-language', 'english')"
        >
          Englisch
        </button>

        <button
          @click="$emit('toggle-language', 'german')"
        >
          Deutsch
        </button>

      </div>

    </div>

  </aside>

</template>

<script setup>
defineProps({
  search: String,
  selectedTypes: Array,
  selectedLanguages: Array
})

defineEmits([
  'update-search',
  'toggle-type',
  'toggle-language',
  'sort'
])
</script>

<style scoped>

.filters {

  width: 100%;
  max-width: 360px;

  align-self: start;


  position: sticky;
  top: 100px;


  height: fit-content;


  background:
    rgba(255,255,255,0.94);

  border-radius: 24px;

  padding: 28px;

  backdrop-filter: blur(12px);

  box-shadow:
    0 10px 28px rgba(0,0,0,0.12);
}

h2 {
  margin-bottom: 20px;
}

input {
  width: 100%;

  padding: 14px;

  border-radius: 12px;

  border:
    1px solid rgba(0,0,0,0.12);

  margin-bottom: 32px;
}

.section {
  margin-top: 32px;
}

.filter-group {
  display: flex;
  flex-wrap: wrap;

  gap: 12px;

  margin-top: 14px;
}

.sort-group {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 14px;
}

.sort-row {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px 0;
}

.sort-row span {
  font-weight: 500;
  color: #2b2b2b;
}

.sort-buttons {
  display: flex;
  gap: 8px;
}

.sort-buttons button {
  width: 34px;
  height: 34px;

  border-radius: 10px;

  background: rgba(0,0,0,0.06);

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  font-weight: 600;

  transition: 0.2s ease;
}

.sort-buttons button:hover {
  background: rgba(0,0,0,0.12);
  transform: translateY(-1px);
}

button {
  border: none;

  border-radius: 999px;

  padding:
    10px 18px;

  background:
    rgba(0,0,0,0.08);

  cursor: pointer;
}

@media (max-width: 1100px) {

  .filters {
    width: 100%;
  }
}

</style>