# Wirtschaftsinformatik Labor

Ein Full-Stack Projekt mit Vue.js Frontend und Express/PostgreSQL Backend.

## Technologie-Stack

- **Frontend:** Vue 3 + Vite
- **Backend:** Node.js + Express
- **Datenbank:** PostgreSQL
- **Authentifizierung:** JWT

## Projekt-Struktur

```
wirtschaftsinformatik-labor/
├── frontend/          # Vue 3 Anwendung
├── backend/           # Express Server mit PostgreSQL
├── .gitignore         # Git ignore Datei
└── README.md
```

## Installation

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# .env Datei bearbeiten und PostgreSQL konfigurieren
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Entwicklung

- **Frontend:** läuft auf `http://localhost:5173`
- **Backend:** läuft auf `http://localhost:3000`

## Git Commands

```bash
git add .
git commit -m "Commit message"
git push
git pull
```
