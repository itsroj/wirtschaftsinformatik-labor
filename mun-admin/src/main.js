import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Admin-App erstellen und Pinia (State Management) + Router registrieren
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
