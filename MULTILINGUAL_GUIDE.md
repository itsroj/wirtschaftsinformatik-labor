# Mehrsprachigkeits-Implementation Guide

## 📋 Übersicht der Änderungen

Deine Webanwendung unterstützt jetzt Deutsch und Englisch! Hier sind alle Details:

---

## 1️⃣ Sprachumschalter (Navbar) ✅

**Status**: Implementiert

Der Language-Button in der Navbar zeigt jetzt:
- 🇩🇪 **DE** = Deutsch (Standard)
- 🇬🇧 **EN** = Englisch

Klick auf den Button schaltet zwischen den Sprachen um.

**Datei**: `frontend/src/components/layout/Navbar.vue`
```vue
<!-- Language Button -->
<button 
  class="language-button"
  @click="languageStore.toggleLanguage()"
>
  {{ languageStore.currentLanguage === 'de' ? '🇩🇪 DE' : '🇬🇧 EN' }}
</button>
```

---

## 2️⃣ Übersetzungsdateien ✅

**Status**: Erstellt

### Deutsche Übersetzungen
📄 `frontend/src/locales/de.json`

```json
{
  "navbar": {
    "home": "Startseite",
    "konferenzen": "Konferenzen",
    "teilnahme": "Teilnahme"
  },
  "konferenzen": {
    "title": "Konferenzen in Deutschland",
    "filters": {
      "language": "Sprache",
      "pupils": "Schüler:innen",
      "students": "Studierende"
    }
  }
}
```

### Englische Übersetzungen
📄 `frontend/src/locales/en.json`

```json
{
  "navbar": {
    "home": "Home",
    "konferenzen": "Conferences",
    "teilnahme": "Participate"
  },
  "konferenzen": {
    "title": "Conferences in Germany",
    "filters": {
      "language": "Language",
      "pupils": "Pupils",
      "students": "Students"
    }
  }
}
```

---

## 3️⃣ Sprachenverwaltung (Pinia Store) ✅

**Status**: Implementiert

📄 `frontend/src/stores/useLanguageStore.js`

### Funktionen:

```js
import { useLanguageStore } from '@/stores/useLanguageStore'

const store = useLanguageStore()

// 1. Übersetzung abrufen
const text = store.t('navbar.home') // "Startseite" oder "Home"

// 2. Sprache wechseln
store.toggleLanguage() // DE ↔ EN

// 3. Explizit setzen
store.setLanguage('en') // Englisch
store.setLanguage('de') // Deutsch

// 4. Aktuelle Sprache
console.log(store.currentLanguage) // 'de' oder 'en'
```

### Speichermechanismus:
- Sprache wird in `localStorage` gespeichert (`appLanguage`)
- Bleibt über Refresh erhalten
- Standard: Deutsch ('de')

---

## 4️⃣ Datenbank-Schema für Übersetzungen ✅

**Status**: Schema angepasst (Migration noch manuell durchzuführen)

### Event-Tabelle (alte Struktur):
```
- id
- title
- longTitle
- description (ein Feld für alles)
- city
- language
```

### Event-Tabelle (neue Struktur):
```
- id
- title           (universal - nicht übersetzt)
- longTitle       (universal - nicht übersetzt)
- description_de  (deutsche Beschreibung)
- description_en  (englische Beschreibung)
- city            (universal)
- language        (verfügbare Sprachen: 'de', 'en', 'both')
- ... weitere Felder
```

### Warum so strukturiert?
✅ **Universal Felder** (title, longTitle, city):
- Event-Namen sind eindeutig
- Nicht sinnvoll zu übersetzen

✅ **Übersetzbare Felder** (description):
- Deutsche & englische Version
- Frontend zeigt passende Version je nach Sprache

---

## 5️⃣ Admin-Formular erweitert ✅

**Status**: Implementiert

📄 `mun-admin/src/views/Konferenzview.vue`

### Neues Formular-Layout:

```vue
<!-- Beschreibung Deutsch -->
<div class="form-group">
  <label>Beschreibung (Deutsch)</label>
  <textarea 
    v-model="form.description_de" 
    rows="4"
  ></textarea>
</div>

<!-- Description English -->
<div class="form-group">
  <label>Description (English)</label>
  <textarea 
    v-model="form.description_en" 
    rows="4"
  ></textarea>
</div>
```

### Form-Struktur:
```js
const form = ref({
  title: '',              // Universal
  longTitle: '',          // Universal
  description_de: '',     // Deutsch
  description_en: '',     // English
  city: '',               // Universal
  language: 'de',         // Verfügbare Sprachen
  date: '',
  endDate: '',
  // ... weitere Felder
})
```

### Daten-Übermittlung:
```js
const payload = {
  title: form.value.title,
  longTitle: form.value.longTitle,
  description_de: form.value.description_de,  // ← NEU
  description_en: form.value.description_en,  // ← NEU
  city: form.value.city,
  language: form.value.language,
  // ...
}
```

---

## 6️⃣ Backend-Controller angepasst ✅

**Status**: Implementiert

📄 `backend/src/controllers/eventController.js`

### createEvent():
```js
const {
  title,
  longTitle,
  description_de,    // ← NEU
  description_en,    // ← NEU
  city,
  // ...
} = req.body;

const eventData = {
  title,
  longTitle,
  description_de: description_de || '',   // ← NEU
  description_en: description_en || '',   // ← NEU
  city,
  // ...
};
```

### updateEvent():
- Aktualisiert automatisch beide Felder
- Keine Speziallogik nötig (Prisma handled das)

---

## 🔧 Datenbank-Migration (MANUELL)

Die automatische Migration ist wahrscheinlich fehlgeschlagen. **Führe dies manuell durch**:

1. Öffne deine Supabase Console oder einen SQL-Editor
2. Führe folgende Befehle aus:

```sql
-- Neue Spalten hinzufügen
ALTER TABLE events 
ADD COLUMN description_de TEXT DEFAULT '';

ALTER TABLE events 
ADD COLUMN description_en TEXT DEFAULT '';

-- Falls alte Beschreibungen migrieren
UPDATE events 
SET description_de = COALESCE(description, '')
WHERE description_de = '';

-- Alte Spalte löschen (optional, nachdem alles funktioniert)
-- ALTER TABLE events DROP COLUMN description;
```

---

## 📱 Verwendungsbeispiele im Frontend

### Navbar:
```vue
<script setup>
import { useLanguageStore } from '@/stores/useLanguageStore'
const store = useLanguageStore()
</script>

<template>
  <nav>
    <router-link to="/">{{ store.t('navbar.home') }}</router-link>
    <router-link to="/konferenzen">{{ store.t('navbar.konferenzen') }}</router-link>
    <button @click="store.toggleLanguage()">
      {{ store.currentLanguage === 'de' ? '🇩🇪' : '🇬🇧' }}
    </button>
  </nav>
</template>
```

### Konferenz-Seite:
```vue
<script setup>
import { useLanguageStore } from '@/stores/useLanguageStore'
import { useEventsStore } from '@/stores/useEventsStore'

const languageStore = useLanguageStore()
const eventsStore = useEventsStore()

// Beschreibung basierend auf Sprache:
const description = computed(() => {
  if (!eventsStore.selectedEvent) return ''
  return languageStore.currentLanguage === 'de'
    ? eventsStore.selectedEvent.description_de
    : eventsStore.selectedEvent.description_en
})
</script>

<template>
  <div>
    <h1>{{ languageStore.t('konferenzen.title') }}</h1>
    <p>{{ description }}</p>
  </div>
</template>
```

---

## 🎯 Nächste Schritte (Optional)

1. **Frontend komplett übersetzen**
   - Alle Texte in de.json/en.json übernehmen
   - `store.t()` überall nutzen

2. **Konferenz-Beschreibungen übersetzen**
   - In Konferenz-Card:
   ```vue
   {{ languageStore.currentLanguage === 'de' 
     ? event.description_de 
     : event.description_en 
   }}
   ```

3. **URL-basierte Sprachauswahl** (Optional)
   - `?lang=en` in URL → Sprache setzen
   - Sprache in URL reflektieren

4. **Browser-Locale beachten**
   ```js
   const browserLanguage = navigator.language.startsWith('de') ? 'de' : 'en'
   ```

5. **Admin-Panel übersetzen**
   - Gleiche Logik wie Frontend anwenden

---

## ✅ Checkliste

- [x] Language Store (Pinia) erstellt
- [x] Sprachdateien (de.json, en.json) erstellt
- [x] Navbar angepasst
- [x] Datenbank-Schema erweitert
- [x] Admin-Formular erweitert (2 Beschreibungsfelder)
- [x] Backend-Controller angepasst
- [ ] Manuelle Datenbank-Migration durchführen
- [ ] Alle Frontend-Texte übersetzen
- [ ] Konferenz-Beschreibungen im Frontend anzeigen

---

## 📞 Fragen?

Falls du Fragen hast oder etwas nicht funktioniert:
1. Überprüfe die Datenbank-Migration (SQL durchführen)
2. Öffne Browser-Console (F12) und prüfe auf Fehler
3. Stelle sicher, dass beide JSON-Dateien valid sind
4. Überprüfe den Language Store Import
