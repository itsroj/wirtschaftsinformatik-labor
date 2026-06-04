# DMUN Backend

Backend für die DMUN Model United Nations Plattform.

## Technologie-Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Datenbank**: PostgreSQL
- **ORM**: Prisma
- **Auth**: JWT (JSON Web Tokens)
- **Container**: Docker + Docker Compose

## Setup

### 1. Dependencies installieren

```bash
cd backend
npm install
```

### 2. Environment-Variablen erstellen

```bash
cp .env.example .env
```

Bearbeite `.env` mit deinen lokalen Einstellungen:

```env
DATABASE_URL="postgresql://postgres@localhost:5432/dmun_db"
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_change_this_in_production
FRONTEND_URL=http://localhost:5173
```

### 3. Datenbank initialisieren

Mit Prisma:

```bash
npm run prisma:generate
npm run prisma:push
```

### 4. Test-Daten einfügen (Optional)

```bash
npm run seed
```

### 5. Backend starten

Entwicklung (mit hot-reload):
```bash
npm run dev
```

Production:
```bash
npm start
```

## Mit Docker starten

```bash
# Beide Services (Backend + PostgreSQL) starten
docker-compose up -d

# Logs ansehen
docker-compose logs -f

# Herunterfahren
docker-compose down
```

## API Endpoints

### Public Routes

- `GET /api/events` - Alle Events abrufen
- `GET /api/events/:id` - Event Details abrufen
- `GET /api/health` - Health Check

### Auth Routes

- `POST /api/auth/login` - Admin Login
- `POST /api/auth/logout` - Admin Logout
- `GET /api/auth/me` - Aktuellen Admin abrufen (geschützt)

### Protected Routes (Admin only)

- `POST /api/events` - Neues Event erstellen
- `PUT /api/events/:id` - Event aktualisieren
- `DELETE /api/events/:id` - Event löschen

## Beispiel API Requests

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@dmun.de",
    "password": "password123"
  }'
```

Antwort:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@dmun.de",
    "name": "Admin User"
  }
}
```

### Event abrufen

```bash
curl http://localhost:5000/api/events \
  -H "Accept: application/json"
```

### Neues Event erstellen (mit Token)

```bash
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "DMUN 2026",
    "description": "Die größte MUN in Deutschland",
    "location": "Berlin",
    "startDate": "2026-05-15",
    "endDate": "2026-05-17",
    "language": "de"
  }'
```

## Struktur

```
backend/
├── src/
│   ├── index.js              # Entry Point
│   ├── controllers/          # Business Logic
│   │   ├── eventController.js
│   │   └── authController.js
│   ├── routes/               # Route Definitionen
│   │   ├── events.js
│   │   └── auth.js
│   ├── middleware/           # Custom Middleware
│   │   └── auth.js
│   ├── models/               # (optional) zusätzliche Models
│   └── config/               # Konfiguration
├── prisma/
│   └── schema.prisma         # Datenbank-Schema
├── package.json
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

## Entwicklung

### Datenbank-Migration (nach Schema-Änderung)

```bash
npm run prisma:migrate
```

### Prisma Studio (GUI für Datenbank)

```bash
npm run prisma:studio
```

Öffnet Prisma Studio unter http://localhost:5555

## Sicherheit

✅ **Implementiert**:
- JWT Authentication
- Passwort-Hashing mit bcrypt
- Input-Validierung
- CORS Protection
- Environment-Variablen für Secrets
- SQL-Injection Protection (via Prisma ORM)

## Nächste Schritte

- [ ] Error Handling erweitern
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
