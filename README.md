# MUNtermacher

Dieses Projekt ist eine Webanwendung zur Darstellung und Verwaltung von Model-United-Nations-Veranstaltungen.

Die Anwendung besteht aktuell aus mehreren Teilen:

- Frontend: sichtbare Website für Besucherinnen und Besucher
- Backend: Schnittstelle und Logik im Hintergrund
- Datenbank: Speicherung der Veranstaltungsdaten
- Docker: gemeinsame Entwicklungsumgebung für das Team

## Voraussetzungen

Auf dem eigenen Rechner sollten installiert sein:

- Git
- Docker Desktop
- Visual Studio Code oder ein anderer Editor

## Aktuellen Stand holen

Vor dem Arbeiten sollte immer zuerst der aktuelle Stand von GitHub geholt werden:

```bash
git pull
```

## Projekt mit Docker starten

Im Hauptordner des Projekts folgenden Befehl ausführen:

```bash
docker compose up
```

Docker startet dann aktuell:

- PostgreSQL 15 als Datenbank
- Node.js 18 für das Backend

## Backend testen

Wenn Docker läuft, ist das Backend erreichbar unter:

```text
http://localhost:3000
```

Wenn alles funktioniert, erscheint im Browser eine Backend-Meldung.

## Docker stoppen

Im Terminal, in dem Docker läuft, kann Docker mit folgender Tastenkombination gestoppt werden:

```text
Strg + C
```

Alternativ kann man im Projektordner folgenden Befehl ausführen:

```bash
docker compose down
```

## Aktuelle Docker-Versionen

In der `docker-compose.yml` werden aktuell verwendet:

```text
postgres:15
node:18
```

Diese Versionen wurden gewählt, weil sie im aktuellen Setup stabil laufen.

## Login-Test

Aktuell gibt es einen einfachen Test-Login für die Entwicklung.

Login-Route:

```text
POST /auth/login
```

Testdaten:

```text
E-Mail: admin@mun.de
Passwort: admin123
```

Nach erfolgreichem Login gibt das Backend ein Token zurück.

Dieser Login ist aktuell nur für die Entwicklung gedacht und wird später noch sauber mit Datenbank und Admin-Bereich abgestimmt.

## Git-Grundbefehle

Änderungen prüfen:

```bash
git status
```

Änderungen vormerken:

```bash
git add .
```

Änderungen lokal speichern:

```bash
git commit -m "Kurze Beschreibung der Änderung"
```

Änderungen zu GitHub hochladen:

```bash
git push
```

Falls `git push` nicht funktioniert, weil auf GitHub schon neuere Änderungen liegen, zuerst ausführen:

```bash
git pull
```

Danach erneut:

```bash
git push
```

## Projektstruktur

```text
wirtschaftsinformatik-labor/
├── backend/
├── frontend/
├── database/
├── docs/
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

## Wichtig

Die Datei `.env.example` ist nur eine Beispieldatei.

Echte Zugangsdaten, Passwörter oder geheime Schlüssel gehören nicht direkt ins Repository.