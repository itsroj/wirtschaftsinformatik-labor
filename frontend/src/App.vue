<template>
  <div id="app">
    <h1>Willkommen zu Wirtschaftsinformatik Labor</h1>
    <p>Frontend mit Vue 3 und Backend mit Express</p>
    <button @click="checkBackend">Backend Status prüfen</button>
    <p v-if="backendStatus">{{ backendStatus }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  name: 'App',
  setup() {
    const backendStatus = ref('')

    const checkBackend = async () => {
      try {
        const response = await axios.get('/api/health')
        backendStatus.value = response.data.status
      } catch (error) {
        backendStatus.value = 'Backend konnte nicht erreicht werden'
      }
    }

    return {
      backendStatus,
      checkBackend
    }
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
}
</style>
