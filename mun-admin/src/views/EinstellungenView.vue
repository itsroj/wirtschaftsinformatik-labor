<template>
  <div class="dashboard">
    <aside class="sidebar">
      <h2>MUN Admin</h2>
      <nav>
        <a @click="router.push('/dashboard')">Dashboard</a>
        <a @click="router.push('/konferenzen/neu')">+ Neue Konferenz</a>
        <a class="active">Einstellungen</a>
      </nav>
      <button class="logout" @click="logout">Abmelden</button>
    </aside>

    <main class="content">
      <h1>Einstellungen</h1>
      <p>Verwalte deine Admin-Zugangsdaten.</p>

      <!-- Email ändern -->
      <div class="section">
        <h2>E-Mail ändern</h2>
        <div v-if="emailSuccess" class="success">{{ emailSuccess }}</div>
        <div v-if="emailError" class="error">{{ emailError }}</div>
        <div class="form-group">
          <label>Neue E-Mail</label>
          <input v-model="newEmail" type="email" placeholder="neue@email.de" />
        </div>
        <button @click="saveEmail" :disabled="emailLoading">
          {{ emailLoading ? 'Wird gespeichert...' : 'E-Mail speichern' }}
        </button>
      </div>

      <!-- Passwort ändern -->
      <div class="section">
        <h2>Passwort ändern</h2>
        <div v-if="pwSuccess" class="success">{{ pwSuccess }}</div>
        <div v-if="pwError" class="error">{{ pwError }}</div>
        <div class="form-group">
          <label>Aktuelles Passwort</label>
          <div class="pw-wrapper">
            <input v-model="currentPassword" :type="showCurrent ? 'text' : 'password'" placeholder="Aktuelles Passwort" />
            <button type="button" class="toggle-pw" @click="showCurrent = !showCurrent" tabindex="-1">{{ showCurrent ? '◉' : '○' }}</button>
          </div>
        </div>
        <div class="form-group">
          <label>Neues Passwort</label>
          <div class="pw-wrapper">
            <input v-model="newPassword" :type="showNew ? 'text' : 'password'" placeholder="Neues Passwort" />
            <button type="button" class="toggle-pw" @click="showNew = !showNew" tabindex="-1">{{ showNew ? '◉' : '○' }}</button>
          </div>
        </div>
        <div class="form-group">
          <label>Neues Passwort bestätigen</label>
          <div class="pw-wrapper">
            <input v-model="confirmPassword" :type="showConfirm ? 'text' : 'password'" placeholder="Passwort wiederholen" />
            <button type="button" class="toggle-pw" @click="showConfirm = !showConfirm" tabindex="-1">{{ showConfirm ? '◉' : '○' }}</button>
          </div>
        </div>
        <button @click="savePassword" :disabled="pwLoading">
          {{ pwLoading ? 'Wird gespeichert...' : 'Passwort speichern' }}
        </button>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function getToken() {
  return localStorage.getItem('admin_token')
}

// Email
const newEmail = ref('')
const emailLoading = ref(false)
const emailSuccess = ref('')
const emailError = ref('')

async function saveEmail() {
  emailError.value = ''
  emailSuccess.value = ''
  if (!newEmail.value) { emailError.value = 'Bitte eine E-Mail eingeben.'; return }
  emailLoading.value = true
  try {
    const response = await fetch('http://localhost:5000/api/auth/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify({ email: newEmail.value })
    })
    if (!response.ok) throw new Error()
    emailSuccess.value = '✅ E-Mail wurde gespeichert!'
    newEmail.value = ''
  } catch {
    emailError.value = 'Fehler beim Speichern.'
  } finally {
    emailLoading.value = false
  }
}

// Passwort
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const pwLoading = ref(false)
const pwSuccess = ref('')
const pwError = ref('')
const showCurrent = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)

async function savePassword() {
  pwError.value = ''
  pwSuccess.value = ''
  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    pwError.value = 'Bitte alle Felder ausfüllen.'; return
  }
  if (newPassword.value !== confirmPassword.value) {
    pwError.value = 'Passwörter stimmen nicht überein.'; return
  }
  pwLoading.value = true
  try {
    const response = await fetch('http://localhost:5000/api/auth/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
      body: JSON.stringify({ currentPassword: currentPassword.value, newPassword: newPassword.value })
    })
    if (!response.ok) throw new Error()
    pwSuccess.value = '✅ Passwort wurde geändert!'
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch {
    pwError.value = 'Fehler beim Speichern. Ist das aktuelle Passwort korrekt?'
  } finally {
    pwLoading.value = false
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
h1 { margin: 0 0 0.5rem; color: #0f3b66; }
h2 { margin: 0 0 1rem; color: #0f3b66; font-size: 1.1rem; }
p { color: #666; margin: 0 0 2rem; }
.section {
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  max-width: 500px;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
label { font-size: 0.9rem; font-weight: 600; color: #374151; }
.pw-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.pw-wrapper input {
  width: 100%;
  padding-right: 3rem;
  box-sizing: border-box;
}
.toggle-pw {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0;
  color: #666;
  align-self: auto;
}
input {
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  width: 100%;
  box-sizing: border-box;
}
input:focus { border-color: #2677b5; }
button {
  padding: 0.75rem 1.5rem;
  background: #0f3b66;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  align-self: flex-start;
}
button:hover:not(:disabled) { background: #092a4a; }
button:disabled { background: #66bdf5; cursor: not-allowed; }
.success {
  background: #dcfce7;
  color: #16a34a;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
}
.error {
  background: #fee2e2;
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
}
</style>