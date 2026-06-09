<template>
  <div class="dashboard">
    <aside class="sidebar">
      <h2>MUN Admin</h2>
      <nav>
        <a @click="router.push('/dashboard')">Dashboard</a>
        <a class="active">Konferenzen</a>
        <a @click="router.push('/einstellungen')">Einstellungen</a>
      </nav>
      <button class="logout" @click="logout">Abmelden</button>
    </aside>

    <main class="content">
      <h1>{{ istBearbeiten ? 'Konferenz bearbeiten' : 'Neue Konferenz eintragen' }}</h1>
      <p>{{ beschreibungsText }}</p>

      <div v-if="success" class="success">{{ success }}</div>
      <div v-if="error" class="error">{{ error }}</div>

      <form class="form" @submit.prevent="submit">

        <div class="form-row">
          <div class="form-group">
            <label>Kurzname</label>
            <input v-model="form.title" type="text" placeholder="z.B. BERMUN" required :disabled="loading" />
          </div>
          <div class="form-group">
            <label>Ausgeschriebener Name</label>
            <input v-model="form.longTitle" type="text" placeholder="z.B. Berlin Model United Nations 2025" required
              :disabled="loading" />
          </div>
        </div>

        <div class="form-group">
          <label>Beschreibung (Deutsch)</label>
          <textarea v-model="form.description_de" rows="4" placeholder="Kurze deutsche Beschreibung der Konferenz..."
            :disabled="loading"></textarea>
        </div>

        <div class="form-group">
          <label>Description (English)</label>
          <textarea v-model="form.description_en" rows="4" placeholder="Short English description of the conference..."
            :disabled="loading"></textarea>
        </div>

        <div class="form-group">
          <label>Stadt</label>
          <input v-model="form.city" type="text" placeholder="z.B. Berlin, Deutschland" required :disabled="loading" />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Startdatum</label>
            <input v-model="form.date" type="date" required :disabled="loading" />
          </div>
          <div class="form-group">
            <label>Enddatum</label>
            <input v-model="form.endDate" type="date" required :disabled="loading" />
          </div>
          <div class="form-group">
            <label>Anmeldefrist</label>
            <input v-model="form.applicationDate" type="date" required :disabled="loading" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Teilnehmerzahl</label>
            <input v-model="form.participants" type="number" min="1" placeholder="z.B. 200" required
              :disabled="loading" />
          </div>
          <div class="form-group">
            <label>Erste Konferenz (Jahr)</label>
            <input v-model="form.firstConference" type="number" min="1900" max="2100" placeholder="z.B. 2015" required
              :disabled="loading" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Sprache</label>
            <select v-model="form.language" :disabled="loading">
              <option value="de">Deutsch</option>
              <option value="en">Englisch</option>
              <option value="both">Deutsch & Englisch</option>
            </select>
          </div>
          <div class="form-group">
            <label>Typ</label>
            <select v-model="form.type" :disabled="loading">
              <option value="schueler">Schüler</option>
              <option value="studenten">Studenten</option>
              <option value="mini-mun">Mini-MUN</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Website</label>
            <input v-model="form.website" type="url" placeholder="https://..." :disabled="loading" />
          </div>
          <div class="form-group">
            <label>Instagram</label>
            <input v-model="form.instagramLink" type="url" placeholder="https://instagram.com/..."
              :disabled="loading" />
          </div>
          <div class="form-group">
            <label>Facebook</label>
            <input v-model="form.facebookLink" type="url" placeholder="https://facebook.com/..." :disabled="loading" />
          </div>
        </div>

        <div class="form-group">
          <label>Logo</label>
          <input type="file" accept=".png,.jpg,.jpeg" @change="handleLogo" :disabled="loading" />
          <div v-if="logoPreview" class="logo-preview">
            <img :src="logoPreview" alt="Logo Vorschau" />
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="cancel" @click="reset" :disabled="loading">Zurücksetzen</button>
          <button type="submit" :disabled="loading">
            {{ loading ? 'Wird gespeichert...' : (istBearbeiten ? 'Änderungen speichern' : 'Konferenz speichern') }}
          </button>
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
const error = ref('')
const loading = ref(false)
const logoPreview = ref(null)

const istBearbeiten = computed(() => !!route.params.id)

const beschreibungsText = computed(() => {
  return istBearbeiten.value
    ? 'Ändere die Daten und speichere.'
    : 'Fülle das Formular aus, um eine neue MUN-Konferenz hinzuzufügen.'
})

const form = ref({
  title: '',
  longTitle: '',
  description_de: '',
  description_en: '',
  city: '',
  date: '',
  endDate: '',
  applicationDate: '',
  participants: '',
  firstConference: '',
  language: 'de',
  type: 'schueler',
  website: '',
  instagramLink: '',
  facebookLink: '',
  logo: null
})

function getToken() {
  return localStorage.getItem('admin_token')
}

onMounted(async () => {
  if (istBearbeiten.value) {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${route.params.id}`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      })
      if (!response.ok) throw new Error()
      const data = await response.json()
      // Hole neueste Conference oder nutze Event-Daten
      let latestConf = null
      if (data.conferences && data.conferences.length > 0) {
        const sorted = [...data.conferences].sort((a, b) =>
          new Date(b.date) - new Date(a.date)
        )
        latestConf = sorted[0]
      }
      form.value = {
        title: data.title || '',
        longTitle: data.longTitle || '',
        description_de: data.description_de || '',
        description_en: data.description_en || '',
        city: data.city || '',
        date: latestConf?.date ? latestConf.date.substring(0, 10) : (data.date ? data.date.substring(0, 10) : ''),
        endDate: latestConf?.endDate ? latestConf.endDate.substring(0, 10) : (data.endDate ? data.endDate.substring(0, 10) : ''),
        applicationDate: latestConf?.applicationDate ? latestConf.applicationDate.substring(0, 10) : (data.applicationDate ? data.applicationDate.substring(0, 10) : ''),
        participants: data.participants || '',
        firstConference: data.firstConference || '',
        language: data.language || 'de',
        instagramLink: data.instagramLink || '',
        facebookLink: data.facebookLink || '',
        type: data.type || 'schueler',
        website: data.website || '',
        logo: null
      }
    } catch {
      error.value = 'Konferenz konnte nicht geladen werden.'
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

async function submit() {
  error.value = ''
  success.value = ''
  loading.value = true

  try {
    const payload = {
      title: form.value.title,
      longTitle: form.value.longTitle,
      description_de: form.value.description_de,
      description_en: form.value.description_en,
      city: form.value.city,
      date: form.value.date,
      endDate: form.value.endDate,
      applicationDate: form.value.applicationDate,
      participants: form.value.participants,
      instagramLink: form.value.instagramLink,
      facebookLink: form.value.facebookLink,
      firstConference: form.value.firstConference,
      language: form.value.language,
      type: form.value.type,
      website: form.value.website
    }

    const url = istBearbeiten.value
      ? `http://localhost:5000/api/events/${route.params.id}`
      : 'http://localhost:5000/api/events'

    const method = istBearbeiten.value ? 'PUT' : 'POST'

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json()

    if (!response.ok) {
      error.value = data.error || 'Ein Fehler ist aufgetreten.'
      return
    }

    // Hole die Event-ID (bei Erstellen aus response, bei Bearbeiten aus params)
    const eventId = data.id || route.params.id

    // Wenn Logo vorhanden, lade es zu Supabase Storage hoch
    if (form.value.logo) {
      const formData = new FormData()
      formData.append('image', form.value.logo)

      const uploadResponse = await fetch(
        `http://localhost:5000/api/events/${eventId}/upload-image`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${getToken()}`
          },
          body: formData
        }
      )

      const uploadData = await uploadResponse.json()

      if (!uploadResponse.ok) {
        console.error('Fehler beim Bild-Upload:', uploadData.error)
        // Bild-Upload Fehler ist nicht kritisch, Event wurde trotzdem erstellt
        error.value = '⚠️ Konferenz erstellt, aber Bild konnte nicht hochgeladen werden.'
        return
      }
    }

    success.value = istBearbeiten.value
      ? '✅ Konferenz und Bild wurden erfolgreich bearbeitet!'
      : '✅ Konferenz und Bild wurden erfolgreich erstellt!'

    setTimeout(() => {
      success.value = ''
      router.push('/dashboard')
    }, 1500)

  } catch {
    error.value = 'Server nicht erreichbar. Bitte später erneut versuchen.'
  } finally {
    loading.value = false
  }
}

function reset() {
  form.value = {
    title: '',
    longTitle: '',
    description_de: '',
    description_en: '',
    city: '',
    date: '',
    endDate: '',
    applicationDate: '',
    participants: '',
    firstConference: '',
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
  background: #0f3b66;
  color: white;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar h2 {
  margin: 0;
  font-size: 1.4rem;
  color: #66bdf5;
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

nav a:hover,
nav a.active {
  background: #ffffff15;
  color: white;
}

nav a.active {
  color: #66bdf5;
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
  color: #0f3b66;
}

p {
  color: #666;
  margin: 0 0 2rem;
}

.form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
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

input,
select,
textarea {
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  font-family: inherit;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #2677b5;
}

input:disabled,
select:disabled,
textarea:disabled {
  background: #f9f9f9;
  color: #aaa;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

button[type="submit"] {
  padding: 0.75rem 1.5rem;
  background: #0f3b66;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

button[type="submit"]:hover:not(:disabled) {
  background: #092a4a;
}

button[type="submit"]:disabled {
  background: #66bdf5;
  cursor: not-allowed;
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

.error {
  background: #fee2e2;
  color: #dc2626;
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