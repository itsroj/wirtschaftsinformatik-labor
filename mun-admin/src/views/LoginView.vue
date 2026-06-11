<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const showPassword = ref(false)

async function login() {
  error.value = ''

  // Einfache Validierung vor dem Request
  if (!email.value || !password.value) {
    error.value = 'Bitte E-Mail und Passwort eingeben.'
    return
  }

  loading.value = true

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const data = await response.json()

    if (!response.ok) {
      error.value = data.message || 'E-Mail oder Passwort falsch.'
      return
    }

    localStorage.setItem('admin_token', data.token)
    router.push('/dashboard')

  } catch (err) {
    error.value = 'Server nicht erreichbar. Bitte später erneut versuchen.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1>MUN Admin</h1>
      <p>Bitte melde dich an</p>

      <div v-if="error" class="error">{{ error }}</div>

      <input
        v-model="email"
        type="email"
        placeholder="E-Mail"
        autocomplete="email"
        :disabled="loading"
        @keyup.enter="login"
      />
      <div class="password-wrapper">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Passwort"
          autocomplete="current-password"
          :disabled="loading"
          @keyup.enter="login"
        />
        <button type="button" class="toggle-pw" @click="showPassword = !showPassword" tabindex="-1">
          {{ showPassword ? '◉' : '○' }}
        </button>
      </div>
      <button type="button" @click="login" :disabled="loading">
        {{ loading ? 'Anmelden...' : 'Anmelden' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at top, #66bdf5 0%, #3c95d1 45%, #2677b5 100%);
}
.login-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #0f3b66;
}
p {
  margin: 0;
  color: #666;
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
input:focus {
  border-color: #2677b5;
}
input:disabled {
  background: #f9f9f9;
  color: #aaa;
}
.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.password-wrapper input {
  padding-right: 3rem;
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
}
button {
  padding: 0.75rem;
  background: #0f3b66;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}
button:hover:not(:disabled) {
  background: #092a4a;
}
button:disabled {
  background: #66bdf5;
  cursor: not-allowed;
}
.error {
  background: #fee2e2;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
}
</style>