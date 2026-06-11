# DMUN Backend

REST API für die DMUN Model United Nations Plattform.  
Stellt alle Konferenz- und Eventdaten bereit und sichert den Admin-Bereich mit JWT-Authentifizierung ab.

## Technologie-Stack

- **Laufzeitumgebung**: Node.js 20+
- **Framework**: Express.js 4
- **Datenbank**: PostgreSQL 15
- **ORM**: Prisma 5
- **Authentifizierung**: JWT (jsonwebtoken) + bcryptjs für Passwort-Hashing
- **Datei-Upload**: Multer + Supabase Storage (Logos)
- **Container**: Docker + Docker Compose

## Setup

### 1. Dependencies installieren

```bash
cd backend
npm install
```

### 2. Umgebungsvariablen erstellen

```bash
cp .env.example .env
```

Pflege diese Werte in `.env`:

```env
DATABASE_URL="postgresql://dmun_user:dmun_password@localhost:5432/dmun_db"
DIRECT_URL="postgresql://dmun_user:dmun_password@localhost:5432/dmun_db"
PORT=5000
NODE_ENV=development
JWT_SECRET=change_me_in_production
FRONTEND_URL=http://localhost:5173
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Datenbank initialisieren

```bash
# Prisma Client generieren
npm run prisma:generate

# Schema auf Datenbank übertragen (Entwicklung)
npm run prisma:push

# Oder: Migration ausführen (Produktion)
npm run prisma:migrate
```

### 4. Admin-Account anlegen (einmalig)

```bash
npm run seed
```

### 5. Backend starten

```bash
# Entwicklung (mit automatischem Neustart)
npm run dev

# Produktion
npm start
```

Läuft auf: `http://localhost:5000`

## Mit Docker starten

```bash
# Alle Services starten (postgres, backend, frontend, admin)
docker-compose up -d

# Logs ansehen
docker-compose logs -f backend

# Herunterfahren
docker-compose down
```

## API Endpoints

### Öffentliche Routen (kein Login erforderlich)

| Methode | Route | Beschreibung |
|---|---|---|
| `GET` | `/api/health` | Health Check |
| `GET` | `/api/events` | Alle Events mit Konferenzterminen |
| `GET` | `/api/events/:id` | Einzelnes Event |
| `GET` | `/api/events/check-title?title=...` | Prüft ob Kurzname bereits vergeben ist |

### Auth-Routen

| Methode | Route | Beschreibung |
|---|---|---|
| `POST` | `/api/auth/login` | Admin-Login, gibt JWT zurück |
| `POST` | `/api/auth/logout` | Abmeldung (client-seitig) |
| `GET` | `/api/auth/me` | Daten des eingeloggten Admins (geschützt) |
| `PUT` | `/api/auth/update` | E-Mail oder Passwort ändern (geschützt) |

### Geschützte Routen (JWT erforderlich)

| Methode | Route | Beschreibung |
|---|---|---|
| `POST` | `/api/events` | Neues Event anlegen |
| `PUT` | `/api/events/:id` | Event bearbeiten |
| `DELETE` | `/api/events/:id` | Event löschen |
| `POST` | `/api/events/:id/upload-image` | Logo hochladen (Supabase Storage) |
| `POST` | `/api/events/:id/conferences` | Konferenztermin hinzufügen |
| `PUT` | `/api/events/:id/conferences/:confId` | Konferenztermin bearbeiten |
| `DELETE` | `/api/events/:id/conferences/:confId` | Konferenztermin löschen |

## Projektstruktur

```
backend/
├── src/
│   ├── index.js                  # Einstiegspunkt, CORS, Middleware, Routes
│   ├── controllers/
│   │   ├── eventController.js    # CRUD für Events + Konferenztermine + Logo-Upload
│   │   └── authController.js     # Login, Logout, Admin-Verwaltung
│   ├── routes/
│   │   ├── events.js             # Event- und Konferenz-Routen
│   │   └── auth.js               # Auth-Routen
│   └── middleware/
│       └── auth.js               # JWT-Verifikations-Middleware
├── prisma/
│   ├── schema.prisma             # Datenbankschema (Event, Conference, Admin)
│   ├── seed.js                   # Initial-Daten (Admin-Account)
│   └── migrations/               # SQL-Migrationsdateien
├── .env.example                  # Vorlage für Umgebungsvariablen
├── Dockerfile
└── README.md
```

## Datenmodell (vereinfacht)

```
Event
├── id, title, longTitle, city
├── description_de, description_en
├── participants, firstConference, language, type
├── website, instagramLink, facebookLink, logo
└── conferences[] → Conference (date, endDate, applicationDate)

Admin
└── id, email, password (bcrypt-gehashed)
```

## Entwicklungs-Hilfsbefehle

```bash
# Prisma Studio (DB-GUI im Browser)
npm run prisma:studio
# → http://localhost:5555

# Schema auf DB übertragen (ohne Migration)
npm run prisma:push

# Neue Migration erstellen
npm run prisma:migrate
```

## Sicherheit

- JWT-Authentifizierung für alle Admin-Routen
- Passwort-Hashing mit bcryptjs
- SQL-Injection-Schutz durch Prisma ORM
- CORS auf erlaubte Origins beschränkt
- Sensible Konfiguration ausschließlich über `.env`-Variablen
- Datei-Upload mit Größen- und MIME-Typ-Validierung (max. 10 MB, nur Bilder)
- [ ] Input Validation mit express-validator
- [ ] Unit Tests schreiben
- [ ] Rate Limiting hinzufügen
- [ ] Logging ausbauen
- [ ] API Documentation generieren (Swagger/OpenAPI)

## Troubleshooting

**Port 5000 bereits in Verwendung?**
```bash
PORT=3000 npm run dev
```

**Datenbank-Verbindung fehlgeschlagen?**
- Prüfe DATABASE_URL in .env
- Starte PostgreSQL: `docker-compose up -d postgres`

**Prisma Fehler?**
```bash
npm run prisma:generate
npm run prisma:push
```

## Lizenz

MIT
