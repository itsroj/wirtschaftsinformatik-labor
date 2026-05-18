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
      <h1>{{ istBearbeiten ? 'Konferenz bearbeiten' : 'Neue Konferenz eintragen' }}</h1>
      <p>{{ istBearbeiten ? 'Ändere die Daten und speichere.' : 'Fülle das Formular aus um eine neue MUN-Konferenz hinzuzufügen.' }}</p>

      <div v-if="success" class="success">{{ success }}</div>

      <form class="form" @submit.prevent="submit">

        <div class="form-row">
          <div class="form-group">
            <label>Kurzname</label>
            <input v-model="form.title" type="text" placeholder="z.B. BERMUN" required />
          </div>
          <div class="form-group">
            <label>Ausgeschriebener Name</label>
            <input v-model="form.longtitle" type="text" placeholder="z.B. Berlin Model United Nations 2025" required />
          </div>
        </div>

        <div class="form-group">
          <label>Beschreibung</label>
          <textarea v-model="form.description" rows="4" placeholder="Kurze Beschreibung der Konferenz..."></textarea>
        </div>

        <div class="form-group">
          <label>Stadt</label>
          <input v-model="form.city" type="text" placeholder="z.B. Berlin, Deutschland" required />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Startdatum</label>
            <input v-model="form.date" type="date" required />
          </div>
          <div class="form-group">
            <label>Enddatum</label>
            <input v-model="form.enddate" type="date" required />
          </div>
          <div class="form-group">
            <label>Anmeldefrist</label>
            <input v-model="form.applicationdate" type="date" required />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Teilnehmerzahl</label>
            <input v-model="form.participants" type="number" min="1" placeholder="z.B. 200" required />
          </div>
          <div class="form-group">
            <label>Erste Konferenz (Jahr)</label>
            <input v-model="form.firstconference" type="number" min="1900" max="2100" placeholder="z.B. 2015" required />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Sprache</label>
            <select v-model="form.language">
              <option value="de">Deutsch</option>
              <option value="en">Englisch</option>
              <option value="both">Deutsch & Englisch</option>
            </select>
          </div>
          <div class="form-group">
            <label>Typ</label>
            <select v-model="form.type">
              <option value="schueler">Schüler</option>
              <option value="studenten">Studenten</option>
              <option value="mini-mun">Mini-MUN</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Website</label>
          <input v-model="form.website" type="url" placeholder="https://..." />
        </div>

        <div class="form-group">
          <label>Logo</label>
          <input type="file" accept=".png,.jpg,.jpeg" @change="handleLogo" />
          <div v-if="logoPreview" class="logo-preview">
            <img :src="logoPreview" alt="Logo Vorschau" />
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="cancel" @click="reset">Zurücksetzen</button>
          <button type="submit">{{ istBearbeiten ? 'Änderungen speichern' : 'Konferenz speichern' }}</button>
        </div>

      </form>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const success = ref('')
const logoPreview = ref(null)

const istBearbeiten = computed(() => !!route.params.id)

const form = ref({
  title: '',
  longtitle: '',
  description: '',
  city: '',
  date: '',
  enddate: '',
  applicationdate: '',
  participants: '',
  firstconference: '',
  language: 'de',
  type: 'schueler',
  website: '',
  logo: null
})

const alleKonferenzen = [
  { id: 1, title: 'BERMUN', longtitle: 'Berlin Model United Nations 2025', description: 'Eine der größten MUN-Konferenzen Deutschlands.', city: 'Berlin', date: '2025-11-12', enddate: '2025-11-15', applicationdate: '2025-09-01', participants: 300, firstconference: 1994, language: 'en', type: 'schueler', website: 'https://bermun.de', logo: null },
  { id: 2, title: 'MUNBW', longtitle: 'Model United Nations Baden-Württemberg 2025', description: 'MUN-Konferenz in Stuttgart.', city: 'Stuttgart', date: '2025-10-03', enddate: '2025-10-05', applicationdate: '2025-08-01', participants: 150, firstconference: 2010, language: 'de', type: 'studenten', website: 'https://munbw.de', logo: null },
  { id: 3, title: 'HAMUN', longtitle: 'Hamburg Model United Nations 2026', description: 'MUN-Konferenz in Hamburg.', city: 'Hamburg', date: '2026-01-20', enddate: '2026-01-22', applicationdate: '2025-11-01', participants: 200, firstconference: 2005, language: 'en', type: 'schueler', website: 'https://hamun.de', logo: null },
]

onMounted(() => {
  if (istBearbeiten.value) {
    const konferenz = alleKonferenzen.find(k => k.id === Number(route.params.id))
    if (konferenz) {
      form.value = { ...konferenz }
    }
  }
})

function handleLogo(event) {
  const file = event.target.files[0]
  if (file) {
    form.value.logo = file
    logoPreview.value = URL.createObjectURL(file)
  }
}

function submit() {
  console.log(istBearbeiten.value ? 'Bearbeitet:' : 'Neu:', form.value)
  success.value = istBearbeiten.value
    ? '✅ Konferenz wurde erfolgreich bearbeitet!'
    : '✅ Konferenz wurde erfolgreich erstellt!'
  setTimeout(() => {
    success.value = ''
    router.push('/dashboard')
  }, 1500)
}

function reset() {
  form.value = {
    title: '',
    longtitle: '',
    description: '',
    city: '',
    date: '',
    enddate: '',
    applicationdate: '',
    participants: '',
    firstconference: '',
    language: 'de',
    type: 'schueler',
    website: '',
    logo: null
  }
  logoPreview.value = null
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
.logo-preview {
  margin-top: 0.5rem;
}
.logo-preview img {
  max-height: 100px;
  border-radius: 8px;
  border: 1px solid #ddd;
}
</style>