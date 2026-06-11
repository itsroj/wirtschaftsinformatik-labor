# DMUN – Deutsche Model United Nations Plattform

Webbasierte Informationsplattform für MUN-Veranstaltungen in Deutschland.  
Entwickelt im Rahmen des Wirtschaftsinformatik-Labors (2026).

## Überblick

| Komponente | Beschreibung | Port |
|---|---|---|
| **Frontend** | Öffentliche Informationsseite (Vue 3) | 5173 |
| **mun-admin** | Admin-Bereich für Konferenzverwaltung (Vue 3) | 5174 |
| **Backend** | REST API (Node.js + Express + Prisma) | 5000 |
| **PostgreSQL** | Relationale Datenbank | 5432 |

## Technologie-Stack

- **Frontend / Admin:** Vue 3, Vite, Pinia, Vue Router
- **Backend:** Node.js 20, Express 4, Prisma 5, JWT, bcryptjs
- **Datenbank:** PostgreSQL 15
- **Datei-Speicherung:** Supabase Storage (Logos)
- **Containerisierung:** Docker + Docker Compose

## Schnellstart (mit Docker)

```bash
# 1. Umgebungsvariablen konfigurieren
cp backend/.env.example .env
# .env bearbeiten (DB-Credentials, JWT_SECRET, Supabase-Keys)

# 2. Alle Services starten
docker-compose up -d

# 3. Admin-Account anlegen (einmalig)
docker exec dmun_backend node prisma/seed.js
```

| Dienst | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Admin | http://localhost:5174 |
| Backend API | http://localhost:5000/api |

## Lokale Entwicklung (ohne Docker)

### Backend

```bash
cd backend
npm install
cp .env.example .env   # .env anpassen
npm run prisma:generate
npm run prisma:push
npm run seed            # Admin-Account anlegen
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Admin

```bash
cd mun-admin
npm install
npm run dev
```

## Projektstruktur

```
wirtschaftsinformatik-labor/
├── frontend/           # Öffentliche Vue 3 Webanwendung
├── mun-admin/          # Admin-Bereich (Vue 3)
├── backend/            # REST API (Express + Prisma)
├── docker-compose.yml  # Orchestrierung aller Services
├── THIRD_PARTY_LICENSES.md  # Übersicht aller verwendeten Bibliotheken
└── README.md
```

Detaillierte Dokumentation:
- [backend/README.md](backend/README.md) – API-Endpunkte, Setup, Datenbankschema
- [frontend/README.md](frontend/README.md) – Seiten, Features, Komponentenstruktur
- [mun-admin/README.md](mun-admin/README.md) – Admin-Routen, Formular, Features
- [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md) – Alle Drittkomponenten mit Lizenzen

## Sicherheit

- JWT-Authentifizierung für alle Admin-Routen
- Passwort-Hashing mit bcryptjs
- SQL-Injection-Schutz durch Prisma ORM (keine Raw Queries)
- XSS-Schutz durch Vue automatisches HTML-Escaping
- CORS auf erlaubte Origins beschränkt
- Sensible Konfiguration ausschließlich über `.env`-Variablen
