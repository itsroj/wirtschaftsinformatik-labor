<template>
  <div class="dashboard">
    <aside class="sidebar">
      <h2>MUN Admin</h2>
      <nav>
        <a @click="router.push('/dashboard')">Dashboard</a>
        <a class="active">Konferenzen</a>
        <a href="#">Einstellungen</a>
      </nav>
      <button class="logout" @click="logout">Abmelden</button>
    </aside>

    <main class="content">
      <h1>Neue Konferenz eintragen</h1>
      <p>Fülle das Formular aus um eine neue MUN-Konferenz hinzuzufügen.</p>

      <div v-if="success" class="success">✅ Konferenz wurde gespeichert!</div>

      <form class="form" @submit.prevent="submit">
        <div class="form-group">
          <label>Name der Konferenz</label>
          <input v-model="form.name" type="text" placeholder="z.B. BERMUN 2025" required />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Datum von</label>
            <input v-model="form.datumVon" type="date" required />
          </div>
          <div class="form-group">
            <label>Datum bis</label>
            <input v-model="form.datumBis" type="date" required />
          </div>
        </div>

        <div class="form-group">
          <label>Ort</label>
          <input v-model="form.ort" type="text" placeholder="z.B. Berlin, Deutschland" required />
        </div>

        <div class="form-group">
          <label>Website / Link</label>
          <input v-model="form.link" type="url" placeholder="https://..." />
        </div>

        <div class="form-group">
          <label>Sprache</label>
          <select v-model="form.sprache">
            <option value="de">Deutsch</option>
            <option value="en">Englisch</option>
            <option value="both">Deutsch & Englisch</option>
          </select>
        </div>

        <div class="form-group">
          <label>Beschreibung</label>
          <textarea v-model="form.beschreibung" rows="4" placeholder="Kurze Beschreibung der Konferenz..."></textarea>
        </div>

        <div class="form-actions">
          <button type="button" class="cancel" @click="reset">Zurücksetzen</button>
          <button type="submit">Konferenz speichern</button>
        </div>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const success = ref(false)

const form = ref({
  name: '',
  datumVon: '',
  datumBis: '',
  ort: '',
  link: '',
  sprache: 'de',
  beschreibung: ''
})

function submit() {
  console.log('Konferenz:', form.value)
  success.value = true
  setTimeout(() => success.value = false, 3000)
}

function reset() {
  form.value = { name: '', datumVon: '', datumBis: '', ort: '', link: '', sprache: 'de', beschreibung: '' }
}

function logout() {
  localStorage.removeItem('admin_token')
  router.push('/login')
}
</script>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 240px;
  background: #1a1a2e;
  color: white;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.sidebar h2 {
  margin: 0;
  font-size: 1.4rem;
  color: #a5b4fc;
}
nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
nav a {
  color: #cbd5e1;
  text-decoration: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}
nav a:hover, nav a.active {
  background: #ffffff15;
  color: white;
}
nav a.active {
  color: #a5b4fc;
}
.logout {
  margin-top: auto;
  padding: 0.75rem;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.content {
  flex: 1;
  padding: 2.5rem;
  background: #f0f2f5;
}
h1 {
  margin: 0 0 0.5rem;
  color: #1a1a2e;
}
p {
  color: #666;
  margin: 0 0 2rem;
}
.form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.form-row {
  display: flex;
  gap: 1rem;
}
.form-row .form-group {
  flex: 1;
}
label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
}
input, select, textarea {
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  font-family: inherit;
}
input:focus, select:focus, textarea:focus {
  border-color: #4f46e5;
}
.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}
button[type="submit"] {
  padding: 0.75rem 1.5rem;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}
button[type="submit"]:hover {
  background: #4338ca;
}
.cancel {
  padding: 0.75rem 1.5rem;
  background: white;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}
.success {
  background: #dcfce7;
  color: #16a34a;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}
</style>