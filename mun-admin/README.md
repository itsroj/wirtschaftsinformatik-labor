# DMUN Admin

Geschützter Administrationsbereich der DMUN Model United Nations Plattform.  
Ermöglicht das Anlegen, Bearbeiten und Löschen von MUN-Konferenzen.

## Technologie-Stack

- **Framework:** Vue 3 (`<script setup>` Composition API)
- **Build-Tool:** Vite
- **State Management:** Pinia
- **Routing:** Vue Router (History Mode)
- **Authentifizierung:** JWT (im localStorage)

## Seiten / Routen

| Route | Seite | Beschreibung |
|---|---|---|
| `/login` | Login | E-Mail + Passwort, gibt JWT zurück |
| `/dashboard` | Dashboard | Konferenzübersicht, Suche, Tabelle, Löschen |
| `/konferenzen/neu` | Neue Konferenz | Formular zum Anlegen |
| `/konferenzen/bearbeiten/:id` | Konferenz bearbeiten | Formular mit vorausgefüllten Daten |
| `/einstellungen` | Einstellungen | E-Mail und Passwort ändern |

Alle Routen außer `/login` sind durch einen Router-Guard geschützt (JWT-Validierung).

## Features

- **Dashboard** mit Konferenz-Tabelle, Suchfilter, Sortierung, Status-Badges und Lösch-Dialog
- **Konferenzformular** (Stammdaten): Titel, Stadt, Beschreibung (DE/EN), Teilnehmerzahl, Links, Logo-Upload
- **Konferenzdaten (Termine)**: Termine direkt im Formular hinzufügen, bearbeiten, löschen
- **Logo-Upload**: Dateiauswahl mit Größenprüfung (max. 5 MB), Vorschau, Upload zu Supabase Storage
- **Einstellungen**: E-Mail-Adresse und Passwort des Admin-Accounts ändern
- **Duplikat-Schutz**: Echtzeit-Prüfung ob ein Kurzname bereits vergeben ist (500 ms Debounce)

## Projektstruktur

```
mun-admin/src/
├── App.vue                   # Root-Komponente, globale Styles
├── main.js                   # App-Einstiegspunkt
├── router/
│   └── index.js              # Routen, isTokenValid(), beforeEach Guard
└── views/
    ├── LoginView.vue          # Anmeldeformular
    ├── DashboardView.vue      # Konferenzübersicht
    ├── KonferenzView.vue      # Erstellen / Bearbeiten
    └── EinstellungenView.vue  # Admin-Konto verwalten
```

## Setup

```bash
cd mun-admin
npm install
npm run dev
```

Läuft auf: `http://localhost:5174`

### Umgebungsvariablen

```env
VITE_API_URL=http://localhost:5000
```

## Build für Produktion

```bash
npm run build
```

Ausgabe im `dist/`-Ordner. Wird in Produktion via nginx (Docker) auf Port 5174 ausgeliefert.
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```


## Setup für lokales Testen Admin Log in + Datenbank

### Voraussetzungen
- Node.js
- Docker Desktop

### Schritte

1. Repo klonen
   git clone https://github.com/itsroj/wirtschaftsinformatik-labor.git
   cd wirtschaftsinformatik-labor

2. Branch wechseln
   git checkout feature/infrastructure-max

3. .env Datei anlegen (im backend/ Ordner)
   Inhalt:
   PORT=5000
   JWT_SECRET=geheimnis123
   DB_USER=munuser
   DB_PASSWORD=munpassword
   DB_NAME=mundb
   DATABASE_URL="postgresql://munuser:munpassword@localhost:5432/mundb"
   FRONTEND_URL=http://localhost:5174
   NODE_ENV=development

4. Docker starten
   cd backend
   docker-compose up -d

5. Datenbank einrichten
   npx prisma migrate dev
   npx prisma db seed

6. Admin Panel starten
   cd ../mun-admin
   npm install
   npm run dev

7. Browser öffnen
   http://localhost:5174
   Login: admin@dmun.de / admin123