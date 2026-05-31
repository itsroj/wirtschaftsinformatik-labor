<template>
  <div class="dashboard">
    <aside class="sidebar">
      <h2>MUN Admin</h2>
      <nav>
        <a class="active">Dashboard</a>
        <a @click="router.push('/konferenzen/neu')">+ Neue Konferenz</a>
        <a href="#">Einstellungen</a>
      </nav>
      <button class="logout" @click="logout">Abmelden</button>
    </aside>

    <main class="content">
      <div class="topbar">
        <div>
          <h1>Dashboard</h1>
          <p>Übersicht aller MUN-Konferenzen</p>
        </div>
        <button class="btn-primary" @click="router.push('/konferenzen/neu')">+ Neue Konferenz</button>
      </div>

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
        <div class="stat-card">
          <span class="icon">📅</span>
          <div>
            <span class="number">{{ dieseWoche }}</span>
            <span class="label">Diese Woche</span>
          </div>
        </div>
      </div>

      <div v-if="ladeError" class="error-banner">{{ ladeError }}</div>

      <div class="table-card">
        <div class="table-header">
          <h2>Aktuelle Konferenzen</h2>
          <input v-model="search" placeholder="Suchen..." class="search" />
        </div>

        <div v-if="loading" class="loading">Konferenzen werden geladen...</div>

        <table v-else>
          <thead>
            <tr>
              <th>Name</th>
              <th>Ort</th>
              <th>Datum</th>
              <th>Sprache</th>
              <th>Status</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="k in filtered" :key="k.id">
              <td><strong>{{ k.title }}</strong></td>
              <td>{{ k.city }}</td>
              <td>{{ formatDatum(k.date) }}</td>
              <td>{{ k.language?.toUpperCase() }}</td>
              <td><span :class="['badge', getStatus(k.date)]">{{ getStatusLabel(k.date) }}</span></td>
              <td>
                <button class="btn-edit" @click="bearbeiten(k.id)">Bearbeiten</button>
                <button class="btn-delete" @click="loeschen(k.id)">Löschen</button>
              </td>
            </tr>
            <tr v-if="filtered.length === 0">
              <td colspan="6" class="empty">Keine Konferenzen gefunden.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Löschen Bestätigung Modal -->
      <div v-if="deleteId" class="modal-overlay">
        <div class="modal">
          <h3>Konferenz löschen?</h3>
          <p>Diese Aktion kann nicht rückgängig gemacht werden.</p>
          <div class="modal-actions">
            <button class="cancel" @click="deleteId = null">Abbrechen</button>
            <button class="btn-delete-confirm" @click="loeschenBestaetigen">Ja, löschen</button>
          </div>
        </div>
      </div>

      <!-- Erfolgsmeldung Toast -->
      <div v-if="successMessage" class="success-toast">
        {{ successMessage }}
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const search = ref('')
const deleteId = ref(null)
const successMessage = ref('')
const konferenzen = ref([])
const loading = ref(true)
const ladeError = ref('')

function getToken() {
  return localStorage.getItem('admin_token')
}

async function ladeKonferenzen() {
  loading.value = true
  ladeError.value = ''
  try {
    const response = await fetch('http://localhost:5000/api/events', {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
    if (!response.ok) throw new Error()
    konferenzen.value = await response.json()
  } catch {
    ladeError.value = 'Konferenzen konnten nicht geladen werden. Ist das Backend gestartet?'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  ladeKonferenzen()
})

const heute = new Date()

function getStatus(datum) {
  return new Date(datum) >= heute ? 'ausstehend' : 'aktiv'
}

function getStatusLabel(datum) {
  return new Date(datum) >= heute ? 'Ausstehend' : 'Aktiv'
}

function formatDatum(datum) {
  if (!datum) return '—'
  return new Date(datum).toLocaleDateString('de-DE', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
}

const aktiveKonferenzen = computed(() =>
  konferenzen.value.filter(k => new Date(k.date) < heute).length
)

const ausstehendKonferenzen = computed(() =>
  konferenzen.value.filter(k => new Date(k.date) >= heute).length
)

const dieseWoche = computed(() => {
  const wochenende = new Date()
  wochenende.setDate(heute.getDate() + 7)
  return konferenzen.value.filter(k => {
    const d = new Date(k.date)
    return d >= heute && d <= wochenende
  }).length
})

const filtered = computed(() =>
  konferenzen.value.filter(k =>
    k.title?.toLowerCase().includes(search.value.toLowerCase()) ||
    k.city?.toLowerCase().includes(search.value.toLowerCase())
  )
)

function bearbeiten(id) {
  router.push(`/konferenzen/bearbeiten/${id}`)
}

function loeschen(id) {
  deleteId.value = id
}

async function loeschenBestaetigen() {
  try {
    const response = await fetch(`http://localhost:5000/api/events/${deleteId.value}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
    if (!response.ok) throw new Error()
    konferenzen.value = konferenzen.value.filter(k => k.id !== deleteId.value)
    successMessage.value = '🗑️ Konferenz wurde erfolgreich gelöscht!'
    setTimeout(() => successMessage.value = '', 3000)
  } catch {
    ladeError.value = 'Löschen fehlgeschlagen. Bitte erneut versuchen.'
  } finally {
    deleteId.value = null
  }
}

function logout() {
  localStorage.removeItem('admin_token')
  router.push('/login')
}
</script>

<style scoped>
.dashboard { display: flex; min-height: 100vh; }

.sidebar {
  width: 240px;
  background: #1a1a2e;
  color: white;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.sidebar h2 { margin: 0; font-size: 1.4rem; color: #a5b4fc; }
nav { display: flex; flex-direction: column; gap: 0.5rem; }
nav a {
  color: #cbd5e1;
  text-decoration: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}
nav a:hover, nav a.active { background: #ffffff15; color: white; }
nav a.active { color: #a5b4fc; }
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
.topbar h1 { margin: 0 0 0.25rem; color: #1a1a2e; }
.topbar p { margin: 0; color: #666; }

.btn-primary {
  padding: 0.75rem 1.5rem;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}
.btn-primary:hover { background: #4338ca; }

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
.number { font-size: 1.8rem; font-weight: bold; color: #1a1a2e; }
.label { font-size: 0.85rem; color: #666; }

.table-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  overflow: hidden;
}
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f0f0f0;
}
.table-header h2 { margin: 0; font-size: 1.1rem; color: #1a1a2e; }
.search {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  outline: none;
}
.search:focus { border-color: #4f46e5; }

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

.btn-edit {
  padding: 0.35rem 0.75rem;
  background: #ede9fe;
  color: #4f46e5;
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
.modal h3 { margin: 0 0 0.5rem; color: #1a1a2e; }
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
  background: #1a1a2e;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  font-size: 0.95rem;
  z-index: 200;
}
</style>