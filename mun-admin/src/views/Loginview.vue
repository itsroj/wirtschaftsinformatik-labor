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
      />
      <input
        v-model="password"
        type="password"
        placeholder="Passwort"
      />
      <button @click="login">Anmelden</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

function login() {
  if (email.value === 'admin@mun.de' && password.value === 'admin123') {
    localStorage.setItem('admin_token', 'fake-token')
    router.push('/dashboard')
  } else {
    error.value = 'E-Mail oder Passwort falsch.'
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
}
.login-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #1a1a2e;
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
}
input:focus {
  border-color: #4f46e5;
}
button {
  padding: 0.75rem;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}
button:hover {
  background: #4338ca;
}
.error {
  background: #fee2e2;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
}
</style>