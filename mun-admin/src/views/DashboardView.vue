<!--
  DashboardView.vue

  Hauptansicht des Admin-Bereichs nach dem Login.
  Zeigt eine Übersicht aller MUN-Konferenzen mit Statistiken,
  Suchfunktion, sortierbarer Tabelle sowie Bearbeiten- und
  Löschen-Aktionen. Enthält außerdem die Logout-Funktion.
-->
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// API-Basis-URL aus Umgebungsvariable, Fallback für lokale Entwicklung
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const router = useRouter()

// Suchbegriff für die Tabellenfilterung
const search = ref('')
// ID der Konferenz, die gelöscht werden soll (steuert den Bestätigungs-Dialog)
const deleteId = ref(null)
const successMessage = ref('')
const konferenzen = ref([])
const loading = ref(true)
const ladeError = ref('')

// Standard-Sortierung: Name aufsteigend
const sortKey = ref('title')
const sortDir = ref('asc')

/** Liest das JWT-Token aus dem localStorage. */
function getToken() {
  return localStorage.getItem('admin_token')
}

/**
 * Gibt das aktuelle Datum zurück.
 * Als Funktion statt const, damit der Wert nicht beim App-Start eingefroren wird.
 */
function heute() {
  return new Date()
}

/** Lädt alle Konferenzen vom Backend und speichert sie in `konferenzen`. */
async function ladeKonferenzen() {
  loading.value = true
  ladeError.value = ''
  try {
    const response = await fetch(`${API_URL}/api/events`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    if (!response.ok) throw new Error()
    konferenzen.value = await response.json()
  } catch {
    ladeError.value = 'Konferenzen konnten nicht geladen werden. Ist das Backend gestartet?'
  } finally {
    loading.value = false
  }
}

onMounted(() => ladeKonferenzen())

/**
 * Gibt Start- und Enddatum einer Konferenz zurück.
 * Falls das Event Unter-Konferenzen hat, wird die neueste davon verwendet.
 */
function getDateForStatus(event) {
  if (event.conferences && event.conferences.length > 0) {
    const sorted = [...event.conferences].sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    )
    return { date: sorted[0].date, endDate: sorted[0].endDate }
  }
  return { date: event.date, endDate: event.endDate }
}

/**
 * Berechnet den Status einer Konferenz anhand des aktuellen Datums.
 * Mögliche Werte: 'aktiv', 'ausstehend', 'vergangen'
 */
function getStatus(k) {
  const now = heute()
  const { date, endDate } = getDateForStatus(k)
  const start = new Date(date)
  const end = new Date(endDate)
  if (now >= start && now <= end) return 'aktiv'
  if (start > now) return 'ausstehend'
  return 'vergangen'
}

/** Gibt das lokalisierte Status-Label zurück (für die Badge-Anzeige). */
function getStatusLabel(k) {
  const status = getStatus(k)
  if (status === 'aktiv') return 'Aktiv'
  if (status === 'ausstehend') return 'Ausstehend'
  return 'Vergangen'
}

/** Formatiert ein Datum als deutsches Kurzformat (z.B. "12. Jun. 2025"). */
function formatDatum(datum) {
  if (!datum) return '—'
  return new Date(datum).toLocaleDateString('de-DE', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
}

/**
 * Gibt das (neueste) Konferenzdatum als formatierten String zurück.
 * Bei Events mit Unter-Konferenzen wird die neueste verwendet.
 */
function getLatestConferenceDate(event) {
  if (event.conferences && event.conferences.length > 0) {
    const sorted = [...event.conferences].sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    )
    return formatDatum(sorted[0].date)
  }
  return formatDatum(event.date)
}

// Berechnete Anzahl aktiver bzw. ausstehender Konferenzen für die Stat-Cards
const aktiveKonferenzen = computed(() =>
  konferenzen.value.filter(k => {
    const now = heute()
    const { date, endDate } = getDateForStatus(k)
    const start = new Date(date)
    const end = new Date(endDate)
    return now >= start && now <= end
  }).length
)

const ausstehendKonferenzen = computed(() =>
  konferenzen.value.filter(k => {
    const { date } = getDateForStatus(k)
    return new Date(date) > heute()
  }).length
)

/**
 * Setzt den Sortierschlüssel oder wechselt die Sortierrichtung,
 * falls die Spalte bereits aktiv ist.
 */
function setSort(key) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
}

/** Gibt das passende Pfeil-Icon für den aktuellen Sortierstatus zurück. */
function sortIcon(key) {
  if (sortKey.value !== key) return '↕'
  return sortDir.value === 'asc' ? '↑' : '↓'
}

/**
 * Gefilterte und sortierte Konferenzliste für die Tabelle.
 * Suche läuft über Titel und Stadt, Datum-Sortierung nutzt echte Date-Objekte.
 */
const filtered = computed(() => {
  let result = konferenzen.value.filter(k =>
    k.title?.toLowerCase().includes(search.value.toLowerCase()) ||
    k.city?.toLowerCase().includes(search.value.toLowerCase())
  )
  if (sortKey.value) {
    result = [...result].sort((a, b) => {
      // Datum-Sortierung: als Date-Objekte vergleichen, kein String-Vergleich
      if (sortKey.value === 'date') {
        const dateA = new Date(getDateForStatus(a).date || 0)
        const dateB = new Date(getDateForStatus(b).date || 0)
        return sortDir.value === 'asc' ? dateA - dateB : dateB - dateA
      }
      const valA = a[sortKey.value] || ''
      const valB = b[sortKey.value] || ''
      return sortDir.value === 'asc'
        ? valA > valB ? 1 : -1
        : valA < valB ? 1 : -1
    })
  }
  return result
})

/** Navigiert zur Bearbeitungsansicht der gewählten Konferenz. */
function bearbeiten(id) {
  router.push(`/konferenzen/bearbeiten/${id}`)
}

/** Setzt die deleteId, um den Bestätigungs-Dialog zu öffnen. */
function loeschen(id) {
  deleteId.value = id
}

/** Führt den Lösch-Request aus und aktualisiert die lokale Liste. */
async function loeschenBestaetigen() {
  try {
    const response = await fetch(`${API_URL}/api/events/${deleteId.value}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    if (!response.ok) throw new Error()
    // Gelöschte Konferenz lokal aus der Liste entfernen (kein erneuter API-Call nötig)
    konferenzen.value = konferenzen.value.filter(k => k.id !== deleteId.value)
    successMessage.value = '🗑️ Konferenz wurde erfolgreich gelöscht!'
    setTimeout(() => successMessage.value = '', 3000)
  } catch {
    ladeError.value = 'Löschen fehlgeschlagen. Bitte erneut versuchen.'
  } finally {
    deleteId.value = null
  }
}

/**
 * Meldet den Nutzer ab, indem das Token aus dem localStorage entfernt wird.
 * TODO (Backlog): Token serverseitig invalidieren via POST /api/auth/logout
 */
function logout() {
  localStorage.removeItem('admin_token')
  router.push('/login')
}
</script>

<template>
  <div class="dashboard">
    <aside class="sidebar">
      <h2>MUN Admin</h2>
      <nav>
        <a class="active">Dashboard</a>
        <a @click="router.push('/konferenzen/neu')">+ Neue Konferenz</a>
        <a @click="router.push('/einstellungen')">Einstellungen</a>
      </nav>
      <button type="button" class="logout" @click="logout">Abmelden</button>
    </aside>

    <main class="content">
      <div class="topbar">
        <div>
          <h1>Dashboard</h1>
          <p>Übersicht aller MUN-Konferenzen</p>
        </div>
        <button type="button" class="btn-primary" @click="router.push('/konferenzen/neu')">+ Neue Konferenz</button>
      </div>

      <!-- Statistik-Karten -->
      <div class="stats">
        <div class="stat-card">
          <span class="icon">🌍</span>
          <div>
            <span class="number">{{ konferenzen.length }}</span>
            <span class="label">Konferenzen gesamt</span>
          </div>
        </div>
        <div class="stat-card">
          <span class="icon">✅</span>
          <div>
            <span class="number">{{ aktiveKonferenzen }}</span>
            <span class="label">Aktiv</span>
          </div>
        </div>
        <div class="stat-card">
          <span class="icon">⏳</span>
          <div>
            <span class="number">{{ ausstehendKonferenzen }}</span>
            <span class="label">Ausstehend</span>
          </div>
        </div>
      </div>

      <!-- Fehlerhinweis beim Laden oder Löschen -->
      <div v-if="ladeError" class="error-banner">{{ ladeError }}</div>

      <div class="table-card">
        <div class="table-header">
          <h2>Aktuelle Konferenzen</h2>
          <input v-model="search" placeholder="Suchen..." class="search" />
        </div>

        <div v-if="loading" class="loading">Konferenzen werden geladen...</div>

        <!-- Konferenz-Tabelle mit klickbaren Spaltenköpfen zum Sortieren -->
        <table v-else>
          <thead>
            <tr>
              <th @click="setSort('title')" class="sortable">
                Name <span class="sort-icon">{{ sortIcon('title') }}</span>
              </th>
              <th @click="setSort('city')" class="sortable">
                Ort <span class="sort-icon">{{ sortIcon('city') }}</span>
              </th>
              <th @click="setSort('date')" class="sortable">
                Datum <span class="sort-icon">{{ sortIcon('date') }}</span>
              </th>
              <th @click="setSort('language')" class="sortable">
                Sprache <span class="sort-icon">{{ sortIcon('language') }}</span>
              </th>
              <th>Status</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="k in filtered" :key="k.id">
              <td><strong>{{ k.title }}</strong></td>
              <td>{{ k.city }}</td>
              <td>{{ getLatestConferenceDate(k) }}</td>
              <td>{{ k.language?.toUpperCase() }}</td>
              <td><span :class="['badge', getStatus(k)]">{{ getStatusLabel(k) }}</span></td>
              <td>
                <button type="button" class="btn-edit" @click="bearbeiten(k.id)">Bearbeiten</button>
                <button type="button" class="btn-delete" @click="loeschen(k.id)">Löschen</button>
              </td>
            </tr>
            <tr v-if="filtered.length === 0">
              <td colspan="6" class="empty">Keine Konferenzen gefunden.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Bestätigungs-Dialog vor dem Löschen -->
      <div v-if="deleteId" class="modal-overlay">
        <div class="modal">
          <h3>Konferenz löschen?</h3>
          <p>Diese Aktion kann nicht rückgängig gemacht werden.</p>
          <div class="modal-actions">
            <button type="button" class="cancel" @click="deleteId = null">Abbrechen</button>
            <button type="button" class="btn-delete-confirm" @click="loeschenBestaetigen">Ja, löschen</button>
          </div>
        </div>
      </div>

      <!-- Erfolgs-Toast (erscheint nach erfolgreichem Löschen) -->
      <div v-if="successMessage" class="success-toast">
        {{ successMessage }}
      </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard { display: flex; min-height: 100vh; }

.sidebar {
  width: 240px;
  background: #0f3b66;
  color: white;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.sidebar h2 { margin: 0; font-size: 1.4rem; color: #66bdf5; }
nav { display: flex; flex-direction: column; gap: 0.5rem; }
nav a {
  color: #cbd5e1;
  text-decoration: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}
nav a:hover, nav a.active { background: #ffffff15; color: white; }
nav a.active { color: #66bdf5; }
.logout {
  margin-top: auto;
  padding: 0.75rem;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.content { flex: 1; padding: 2.5rem; background: #f0f2f5; }

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.topbar h1 { margin: 0 0 0.25rem; color: #0f3b66; }
.topbar p { margin: 0; color: #666; }

.btn-primary {
  padding: 0.75rem 1.5rem;
  background: #0f3b66;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}
.btn-primary:hover { background: #092a4a; }

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;
}
.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
}
.stat-card .icon { font-size: 2rem; }
.stat-card div { display: flex; flex-direction: column; }
.number { font-size: 1.8rem; font-weight: bold; color: #0f3b66; }
.label { font-size: 0.85rem; color: #666; }

.table-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  overflow: hidden;
  max-height: 600px;
  overflow-y: auto;
}
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f0f0f0;
}
.table-header h2 { margin: 0; font-size: 1.1rem; color: #0f3b66; }
.search {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
}
.search:focus { border-color: #2677b5; }

.loading {
  padding: 2rem;
  text-align: center;
  color: #666;
  font-size: 0.95rem;
}

.error-banner {
  background: #fee2e2;
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

table { width: 100%; border-collapse: collapse; }
thead { background: #f8f9fa; }
th {
  text-align: left;
  padding: 0.75rem 1.5rem;
  font-size: 0.85rem;
  color: #666;
  font-weight: 600;
}
th.sortable {
  cursor: pointer;
  user-select: none;
}
th.sortable:hover { color: #0f3b66; }
.sort-icon { margin-left: 0.25rem; }
td {
  padding: 1rem 1.5rem;
  border-top: 1px solid #f0f0f0;
  font-size: 0.95rem;
  color: #374151;
}

.empty {
  text-align: center;
  color: #999;
  padding: 2rem !important;
  font-size: 0.95rem;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}
.badge.aktiv { background: #dcfce7; color: #16a34a; }
.badge.ausstehend { background: #fef9c3; color: #ca8a04; }
.badge.vergangen { background: #f1f5f9; color: #94a3b8; }

.btn-edit {
  padding: 0.35rem 0.75rem;
  background: #dbeafe;
  color: #2677b5;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  margin-right: 0.5rem;
}
.btn-delete {
  padding: 0.35rem 0.75rem;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.modal {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 400px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}
.modal h3 { margin: 0 0 0.5rem; color: #0f3b66; }
.modal p { margin: 0 0 1.5rem; color: #666; }
.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
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
.btn-delete-confirm {
  padding: 0.75rem 1.5rem;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}
.btn-delete-confirm:hover { background: #b91c1c; }

.success-toast {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #0f3b66;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  font-size: 0.95rem;
  z-index: 200;
}
</style>