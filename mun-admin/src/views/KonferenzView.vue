<!--
  KonferenzView.vue

  Wird für zwei Routen verwendet:
    - /konferenzen/neu       → neue Konferenz anlegen
    - /konferenzen/bearbeiten/:id → bestehende Konferenz bearbeiten

  Das Formular deckt alle Stammdaten einer Konferenz ab (Titel, Ort,
  Beschreibungen, Links, Logo). Unterhalb des Formulars können
  Konferenzdaten (Termine) separat verwaltet werden.
  Im Erstellen-Modus werden Termine lokal zwischengespeichert und
  erst nach dem Speichern der Konferenz ans Backend gesendet.
-->
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// API-Basis-URL aus Umgebungsvariable, Fallback für lokale Entwicklung
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const router = useRouter()
const route = useRoute()

// Globale Formular-Zustände
const success = ref('')
const error = ref('')
const loading = ref(false)
const logoPreview = ref(null)
const titleWarning = ref(false)

// Konferenzdaten-Verwaltung (Termine unterhalb des Hauptformulars)
const conferences = ref([])
const confLoading = ref(false)
const confSuccess = ref('')
const confError = ref('')
const showNewConf = ref(false)
const newConf = ref({ date: '', endDate: '', applicationDate: '' })
const editingConfId = ref(null)
const editingConf = ref({ date: '', endDate: '', applicationDate: '' })

/** true wenn wir uns auf der Bearbeiten-Route befinden (ID in URL vorhanden) */
const istBearbeiten = computed(() => !!route.params.id)

const beschreibungsText = computed(() => {
  return istBearbeiten.value
    ? 'Ändere die Daten und speichere.'
    : 'Fülle das Formular aus, um eine neue MUN-Konferenz hinzuzufügen.'
})

// Formulardaten (Stammdaten der Konferenz)
const form = ref({
  title: '',
  longTitle: '',
  description_de: '',
  description_en: '',
  city: '',
  participants: '',
  firstConference: '',
  language: 'de',
  type: 'schueler',
  website: '',
  instagramLink: '',
  facebookLink: '',
  logo: null
})

// Zähler für temporäre IDs im Erstellen-Modus (negative Werte = lokal, noch nicht in DB)
let tempIdCounter = -1

/**
 * Prüft nach 500ms Tippverzögerung ob der eingegebene Kurzname
 * bereits in der Datenbank existiert (Duplikat-Warnung).
 * Bei Bearbeiten wird die aktuelle ID ausgeschlossen.
 */
let titleCheckTimer = null
watch(() => form.value.title, (newTitle) => {
  titleWarning.value = false
  clearTimeout(titleCheckTimer)
  if (!newTitle || !newTitle.trim()) return
  titleCheckTimer = setTimeout(async () => {
    try {
      const excludeId = route.params.id ? `&excludeId=${route.params.id}` : ''
      const res = await fetch(
        `${API_URL}/api/events/check-title?title=${encodeURIComponent(newTitle.trim())}${excludeId}`
      )
      const data = await res.json()
      titleWarning.value = data.exists
    } catch {
      // Im Fehlerfall kein Hinweis anzeigen — kein Blocker für den Nutzer
    }
  }, 500)
})

/** Liest das JWT-Token aus dem localStorage. */
function getToken() {
  return localStorage.getItem('admin_token')
}

/**
 * Lädt die bestehenden Konferenzdaten beim Bearbeiten-Modus.
 * Im Erstellen-Modus passiert hier nichts.
 */
onMounted(async () => {
  if (istBearbeiten.value) {
    try {
      const response = await fetch(`${API_URL}/api/events/${route.params.id}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      })
      if (!response.ok) throw new Error()
      const data = await response.json()

      // Termine absteigend nach Datum sortieren
      conferences.value = [...(data.conferences || [])].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )

      // Formular mit vorhandenen Daten befüllen
      form.value = {
        title: data.title || '',
        longTitle: data.longTitle || '',
        description_de: data.description_de || '',
        description_en: data.description_en || '',
        city: data.city || '',
        date: '',
        endDate: '',
        applicationDate: '',
        participants: data.participants || '',
        firstConference: data.firstConference || '',
        language: data.language || 'de',
        type: data.type || 'schueler',
        website: data.website || '',
        instagramLink: data.instagramLink || '',
        facebookLink: data.facebookLink || '',
        logo: null
      }
    } catch {
      error.value = 'Konferenz konnte nicht geladen werden.'
    }
  }
})

/**
 * Verarbeitet die Logo-Dateiauswahl.
 * Prüft Dateigröße (max. 5 MB) und erstellt eine lokale Vorschau-URL.
 * Gibt die alte Object-URL frei um Memory-Leaks zu vermeiden.
 */
function handleLogo(event) {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      error.value = 'Das Logo darf maximal 5 MB groß sein.'
      event.target.value = ''
      return
    }
    // Alte Object-URL freigeben bevor neue erstellt wird (Memory-Leak vermeiden)
    if (logoPreview.value) {
      URL.revokeObjectURL(logoPreview.value)
    }
    form.value.logo = file
    logoPreview.value = URL.createObjectURL(file)
  }
}

/**
 * Client-seitige Pflichtfeld- und Datums-Validierung.
 * Gibt einen Fehlertext zurück oder null wenn alles valide ist.
 * Optionale Felder: Beschreibungen DE/EN, Website, Instagram, Facebook, Logo.
 */
function validieren() {
  if (!form.value.title.trim()) return 'Kurzname ist erforderlich.'
  if (!form.value.longTitle.trim()) return 'Ausgeschriebener Name ist erforderlich.'
  if (!form.value.city.trim()) return 'Stadt ist erforderlich.'
  if (!form.value.participants) return 'Teilnehmerzahl ist erforderlich.'
  if (!form.value.firstConference) return 'Erste Konferenz (Jahr) ist erforderlich.'
  return null
}

/**
 * Sendet das Formular ans Backend (POST für neu, PUT für bearbeiten).
 * Lädt anschließend ggf. das Logo hoch und sendet lokale Termine.
 */
async function submit() {
  error.value = ''
  success.value = ''

  const validierungsFehler = validieren()
  if (validierungsFehler) {
    error.value = validierungsFehler
    return
  }

  loading.value = true

  try {
    const payload = {
      title: form.value.title,
      longTitle: form.value.longTitle,
      description_de: form.value.description_de,
      description_en: form.value.description_en,
      city: form.value.city,
      participants: form.value.participants,
      firstConference: form.value.firstConference,
      language: form.value.language,
      type: form.value.type,
      website: form.value.website,
      instagramLink: form.value.instagramLink,
      facebookLink: form.value.facebookLink
    }

    const url = istBearbeiten.value
      ? `${API_URL}/api/events/${route.params.id}`
      : `${API_URL}/api/events`

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

    // Bei Erstellen kommt die ID aus der Response, beim Bearbeiten aus den URL-Params
    const eventId = data.id || route.params.id

    // Im Erstellen-Modus: lokal zwischengespeicherte Termine jetzt ans Backend senden
    if (!istBearbeiten.value && conferences.value.length > 0) {
      for (const conf of conferences.value) {
        try {
          await fetch(`${API_URL}/api/events/${eventId}/conferences`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
              date: conf.date,
              endDate: conf.endDate || null,
              applicationDate: conf.applicationDate || null
            })
          })
        } catch { /* Termin-Upload nicht kritisch — Konferenz selbst ist gespeichert */ }
      }
    }

    // Logo-Upload falls eine Datei ausgewählt wurde
    if (form.value.logo) {
      const formData = new FormData()
      formData.append('image', form.value.logo)

      const uploadResponse = await fetch(`${API_URL}/api/events/${eventId}/upload-image`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getToken()}` },
        body: formData
      })

      if (!uploadResponse.ok) {
        // Konferenz gespeichert, aber Logo-Upload fehlgeschlagen
        error.value = '⚠️ Konferenz gespeichert, aber Logo konnte nicht hochgeladen werden.'
        return
      }

      success.value = istBearbeiten.value
        ? '✅ Konferenz und Logo wurden erfolgreich aktualisiert!'
        : '✅ Konferenz und Logo wurden erfolgreich erstellt!'
    } else {
      success.value = istBearbeiten.value
        ? '✅ Konferenz wurde erfolgreich aktualisiert!'
        : '✅ Konferenz wurde erfolgreich erstellt!'
    }

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

/** Setzt das Formular auf Ausgangszustand zurück und gibt die Logo-URL frei. */
function reset() {
  form.value = {
    title: '',
    longTitle: '',
    description_de: '',
    description_en: '',
    city: '',
    participants: '',
    firstConference: '',
    language: 'de',
    type: 'schueler',
    website: '',
    instagramLink: '',
    facebookLink: '',
    logo: null
  }
  if (logoPreview.value) {
    URL.revokeObjectURL(logoPreview.value)
  }
  conferences.value = []
  logoPreview.value = null
}

/**
 * Meldet den Nutzer ab.
 * TODO (Backlog): Token serverseitig invalidieren via POST /api/auth/logout
 */
function logout() {
  localStorage.removeItem('admin_token')
  router.push('/login')
}

/** Formatiert ein ISO-Datum als deutsches Kurzformat (TT.MM.JJJJ). */
function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('de-DE', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  })
}

/** Öffnet den Inline-Editor für einen bestehenden Termin. */
function startEditConference(conf) {
  editingConfId.value = conf.id
  editingConf.value = {
    date: conf.date ? conf.date.substring(0, 10) : '',
    endDate: conf.endDate ? conf.endDate.substring(0, 10) : '',
    applicationDate: conf.applicationDate ? conf.applicationDate.substring(0, 10) : ''
  }
}

/**
 * Fügt einen neuen Termin hinzu.
 * Im Erstellen-Modus: lokal mit temporärer ID speichern.
 * Im Bearbeiten-Modus: direkt ans Backend senden.
 */
async function addConference() {
  if (!newConf.value.date) {
    confError.value = 'Bitte Startdatum angeben.'
    return
  }

  // Datums-Validierung
  if (newConf.value.endDate && newConf.value.endDate < newConf.value.date) {
    confError.value = 'Enddatum darf nicht vor dem Startdatum liegen.'
    return
  }
  if (newConf.value.applicationDate && newConf.value.applicationDate > newConf.value.date) {
    confError.value = 'Anmeldefrist muss vor oder am Startdatum liegen.'
    return
  }

  confError.value = ''

  if (!istBearbeiten.value) {
    conferences.value.push({ id: tempIdCounter--, ...newConf.value })
    conferences.value.sort((a, b) => new Date(b.date) - new Date(a.date))
    newConf.value = { date: '', endDate: '', applicationDate: '' }
    showNewConf.value = false
    return
  }

  confLoading.value = true
  try {
    const res = await fetch(`${API_URL}/api/events/${route.params.id}/conferences`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(newConf.value)
    })
    const data = await res.json()
    if (!res.ok) { confError.value = data.error || 'Fehler beim Speichern.'; return }
    conferences.value.unshift(data)
    conferences.value.sort((a, b) => new Date(b.date) - new Date(a.date))
    newConf.value = { date: '', endDate: '', applicationDate: '' }
    showNewConf.value = false
    confSuccess.value = 'Termin hinzugefügt.'
    setTimeout(() => { confSuccess.value = '' }, 2500)
  } catch {
    confError.value = 'Server nicht erreichbar.'
  } finally {
    confLoading.value = false
  }
}

/**
 * Speichert Änderungen an einem bestehenden Termin.
 * Im Erstellen-Modus: lokale Liste aktualisieren.
 * Im Bearbeiten-Modus: PUT-Request ans Backend.
 */
async function saveConference(confId) {
  if (!editingConf.value.date) {
    confError.value = 'Bitte Startdatum angeben.'
    return
  }

  // Datums-Validierung
  if (editingConf.value.endDate && editingConf.value.endDate < editingConf.value.date) {
    confError.value = 'Enddatum darf nicht vor dem Startdatum liegen.'
    return
  }
  if (editingConf.value.applicationDate && editingConf.value.applicationDate > editingConf.value.date) {
    confError.value = 'Anmeldefrist muss vor oder am Startdatum liegen.'
    return
  }

  confError.value = ''

  if (!istBearbeiten.value) {
    const idx = conferences.value.findIndex(c => c.id === confId)
    if (idx !== -1) conferences.value[idx] = { id: confId, ...editingConf.value }
    conferences.value.sort((a, b) => new Date(b.date) - new Date(a.date))
    editingConfId.value = null
    return
  }

  confLoading.value = true
  try {
    const res = await fetch(`${API_URL}/api/events/${route.params.id}/conferences/${confId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(editingConf.value)
    })
    const data = await res.json()
    if (!res.ok) { confError.value = data.error || 'Fehler beim Speichern.'; return }
    const idx = conferences.value.findIndex(c => c.id === confId)
    if (idx !== -1) conferences.value[idx] = data
    conferences.value.sort((a, b) => new Date(b.date) - new Date(a.date))
    editingConfId.value = null
    confSuccess.value = 'Termin gespeichert.'
    setTimeout(() => { confSuccess.value = '' }, 2500)
  } catch {
    confError.value = 'Server nicht erreichbar.'
  } finally {
    confLoading.value = false
  }
}

/**
 * Löscht einen Termin nach Bestätigung.
 * Im Erstellen-Modus: aus lokaler Liste entfernen.
 * Im Bearbeiten-Modus: DELETE-Request ans Backend.
 */
async function deleteConference(confId) {
  if (!confirm('Diesen Termin wirklich löschen?')) return
  confError.value = ''

  if (!istBearbeiten.value) {
    conferences.value = conferences.value.filter(c => c.id !== confId)
    return
  }

  confLoading.value = true
  try {
    const res = await fetch(`${API_URL}/api/events/${route.params.id}/conferences/${confId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    if (!res.ok) {
      const d = await res.json()
      confError.value = d.error || 'Fehler beim Löschen.'
      return
    }
    conferences.value = conferences.value.filter(c => c.id !== confId)
    confSuccess.value = 'Termin gelöscht.'
    setTimeout(() => { confSuccess.value = '' }, 2500)
  } catch {
    confError.value = 'Server nicht erreichbar.'
  } finally {
    confLoading.value = false
  }
}
</script>

<template>
  <div class="dashboard">
    <aside class="sidebar">
      <h2>MUN Admin</h2>
      <nav>
        <a @click="router.push('/dashboard')">Dashboard</a>
        <a class="active">Konferenzen</a>
        <a @click="router.push('/einstellungen')">Einstellungen</a>
      </nav>
      <button type="button" class="logout" @click="logout">Abmelden</button>
    </aside>

    <main class="content">
      <h1>{{ istBearbeiten ? 'Konferenz bearbeiten' : 'Neue Konferenz eintragen' }}</h1>
      <p>{{ beschreibungsText }}</p>

      <!-- Erfolgs- und Fehlermeldungen -->
      <div v-if="success" class="success">{{ success }}</div>
      <div v-if="error" class="error">{{ error }}</div>

      <form class="form" @submit.prevent="submit">

        <!-- Pflichtfeld-Hinweis -->
        <p class="pflichtfeld-hinweis">* Pflichtfelder</p>

        <div class="form-row">
          <div class="form-group">
            <label>Kurzname *</label>
            <input v-model="form.title" type="text" placeholder="z.B. BERMUN" :disabled="loading" />
            <span v-if="titleWarning" class="field-warning">
              ⚠️ Dieser Kurzname existiert bereits in der Datenbank.
            </span>
          </div>
          <div class="form-group">
            <label>Ausgeschriebener Name *</label>
            <input v-model="form.longTitle" type="text" placeholder="z.B. Berlin Model United Nations 2025"
              :disabled="loading" />
          </div>
        </div>

        <!-- Beschreibungen sind optional -->
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
          <label>Stadt *</label>
          <input v-model="form.city" type="text" placeholder="z.B. Berlin, Deutschland" :disabled="loading" />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Teilnehmerzahl *</label>
            <input v-model="form.participants" type="number" min="1" placeholder="z.B. 200" :disabled="loading" />
          </div>
          <div class="form-group">
            <label>Erste Konferenz (Jahr) *</label>
            <input v-model="form.firstConference" type="number" min="1900" max="2100" placeholder="z.B. 2015"
              :disabled="loading" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Sprache *</label>
            <select v-model="form.language" :disabled="loading">
              <option value="de">Deutsch</option>
              <option value="en">Englisch</option>
              <option value="both">Deutsch & Englisch</option>
            </select>
          </div>
          <div class="form-group">
            <label>Typ *</label>
            <select v-model="form.type" :disabled="loading">
              <option value="schueler">Schüler</option>
              <option value="studenten">Studenten</option>
              <option value="mini-mun">Mini-MUN</option>
            </select>
          </div>
        </div>

        <!-- Optionale Felder: Website und Social Media -->
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

        <!-- Logo-Upload ist optional -->
        <div class="form-group">
          <label>Logo</label>
          <input type="file" accept=".png,.jpg,.jpeg" @change="handleLogo" :disabled="loading" />
          <div v-if="logoPreview" class="logo-preview">
            <img :src="logoPreview" alt="Logo Vorschau" />
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="cancel" @click="reset" :disabled="loading">Zurücksetzen</button>
          <button type="submit" :disabled="loading || titleWarning">
            {{ loading ? 'Wird gespeichert...' : (istBearbeiten ? 'Änderungen speichern' : 'Konferenz speichern') }}
          </button>
        </div>

      </form>

      <!-- KONFERENZDATEN (Termine) -->
      <section class="conferences-section">
        <div class="section-header">
          <h2>Konferenzdaten</h2>
          <button type="button" class="add-conf-btn" @click="showNewConf = true" v-if="!showNewConf">
            + Neuen Termin hinzufügen
          </button>
        </div>

        <div v-if="confSuccess" class="success conf-msg">{{ confSuccess }}</div>
        <div v-if="confError" class="error conf-msg">{{ confError }}</div>

        <div class="conference-list">

          <!-- Eingabe-Zeile für neuen Termin -->
          <div v-if="showNewConf" class="conference-row new-row">
            <div class="form-row">
              <div class="form-group">
                <label>Startdatum *</label>
                <input v-model="newConf.date" type="date" />
              </div>
              <div class="form-group">
                <label>Enddatum</label>
                <input v-model="newConf.endDate" type="date" />
              </div>
              <div class="form-group">
                <label>Anmeldefrist</label>
                <input v-model="newConf.applicationDate" type="date" />
              </div>
            </div>
            <div class="conf-row-actions">
              <button type="button" @click="addConference" :disabled="confLoading">Speichern</button>
              <button type="button" class="cancel" @click="showNewConf = false">Abbrechen</button>
            </div>
          </div>

          <!-- Liste bestehender Termine -->
          <div v-for="conf in conferences" :key="conf.id" class="conference-row">

            <!-- Bearbeitungs-Modus für einzelnen Termin -->
            <template v-if="editingConfId === conf.id">
              <div class="form-row">
                <div class="form-group">
                  <label>Startdatum *</label>
                  <input v-model="editingConf.date" type="date" />
                </div>
                <div class="form-group">
                  <label>Enddatum</label>
                  <input v-model="editingConf.endDate" type="date" />
                </div>
                <div class="form-group">
                  <label>Anmeldefrist</label>
                  <input v-model="editingConf.applicationDate" type="date" />
                </div>
              </div>
              <div class="conf-row-actions">
                <button type="button" @click="saveConference(conf.id)" :disabled="confLoading">Speichern</button>
                <button type="button" class="cancel" @click="editingConfId = null">Abbrechen</button>
              </div>
            </template>

            <!-- Anzeige-Modus für einzelnen Termin -->
            <template v-else>
              <div class="conf-display">
                <div class="conf-dates">
                  <span class="conf-label">Termin:</span>
                  <span>{{ formatDate(conf.date) }}{{ conf.endDate ? ' – ' + formatDate(conf.endDate) : '' }}</span>
                </div>
                <div class="conf-dates" v-if="conf.applicationDate">
                  <span class="conf-label">Anmeldeschluss:</span>
                  <span>{{ formatDate(conf.applicationDate) }}</span>
                </div>
              </div>
              <div class="conf-row-actions">
                <button type="button" class="edit-btn" @click="startEditConference(conf)">Bearbeiten</button>
                <button type="button" class="delete-btn" @click="deleteConference(conf.id)">Löschen</button>
              </div>
            </template>
          </div>

          <!-- Hinweis wenn noch keine Termine vorhanden -->
          <div v-if="conferences.length === 0 && !showNewConf" class="no-conferences">
            {{ istBearbeiten ? 'Noch keine Konferenzdaten vorhanden.' : 'Füge unten Termine für dieses Event hinzu.' }}
          </div>

        </div>
      </section>

    </main>
  </div>
</template>

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
  max-width: 760px;
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

.pflichtfeld-hinweis {
  font-size: 0.8rem;
  color: #999;
  margin: 0;
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

.field-warning {
  display: block;
  margin-top: 0.4rem;
  font-size: 0.85rem;
  color: #d97706;
  font-weight: 500;
}

.logo-preview {
  margin-top: 0.5rem;
}

.logo-preview img {
  max-height: 100px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

/* ---- Konferenzdaten-Sektion (innerhalb .form) ---- */

.form-divider {
  height: 1px;
  background: #e5e7eb;
  margin: 0.25rem 0;
}

.section-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #0f3b66;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.add-conf-btn {
  padding: 0.5rem 1rem;
  background: #0f3b66;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
}

.add-conf-btn:hover {
  background: #092a4a;
}

.conf-msg {
  margin-bottom: 0.75rem;
}

.conference-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.conference-row {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.new-row {
  border-color: #2677b5;
  flex-direction: column;
  align-items: stretch;
}

.conf-display {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.conf-dates {
  display: flex;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #374151;
}

.conf-label {
  font-weight: 600;
  color: #6b7280;
  min-width: 120px;
}

.conf-row-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.edit-btn {
  padding: 0.45rem 0.9rem;
  background: #e0f0ff;
  color: #2677b5;
  border: 1px solid #b3d6f5;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
}

.edit-btn:hover {
  background: #c0e0ff;
}

.delete-btn {
  padding: 0.45rem 0.9rem;
  background: #fee2e2;
  color: #dc2626;
  border: 1px solid #fca5a5;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
}

.delete-btn:hover {
  background: #fecaca;
}

.no-conferences {
  color: #9ca3af;
  font-size: 0.9rem;
  padding: 1rem 0;
  text-align: center;
}
</style>