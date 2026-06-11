# DMUN Frontend

Öffentliche Webanwendung der DMUN Model United Nations Plattform.  
Informationsseite für MUN-Interessierte mit Konferenzübersicht, Karte, Kalender und Mehrsprachigkeit.

## Technologie-Stack

- **Framework:** Vue 3 (`<script setup>` Composition API)
- **Build-Tool:** Vite
- **State Management:** Pinia
- **Routing:** Vue Router (History Mode)
- **Kalender:** FullCalendar v6
- **Icons:** Lucide Vue

## Seiten / Routen

| Route | Seite | Beschreibung |
|---|---|---|
| `/` | Startseite | Hero, Karte, Infokarten |
| `/was-ist-mun` | Was ist MUN? | Erklärung des MUN-Planspiels |
| `/konferenzen` | Konferenzen | Liste, Karte, Kalender, Filter |
| `/teilnahme` | Teilnahme | Infos zur Konferenzteilnahme |
| `/service` | Service | Kontakt, Links, Social Media |
| `/*` | 404 | Seite nicht gefunden |

## Features

- **Konferenzübersicht** mit Suche, Typ-/Sprachfiltern, Sortierung und Vergangenheits-Toggle
- **Kartenansicht** (SVG Deutschland-Karte) mit Stadt-Pins, Multi-Event-Grouping und Sidebar
- **Kalenderansicht** (FullCalendar) mit Konferenz- und Bewerbungsfrist-Einträgen
- **Mehrsprachigkeit** DE/EN mit `useLanguageStore` und JSON-Locales
- **Dark Mode** mit localStorage-Persistenz und Flash-Prevention
- **Responsives Design** für Desktop und Mobile

## Projekt-Struktur

```
frontend/src/
├── App.vue                   # Root-Komponente, globale Styles + Dark Mode CSS
├── main.js                   # App-Einstiegspunkt, Router + Hash-Scroll-Logik
├── router/
│   └── index.js              # Routen-Definitionen, afterEach Title/Meta-Update
├── stores/
│   ├── useEventsStore.js     # Events, Filter-Zustand, ausgewähltes Event
│   ├── useLanguageStore.js   # DE/EN Sprachumschaltung, t()-Übersetzungsfunktion
│   └── useThemeStore.js      # Dark/Light Mode, localStorage-Persistenz
├── views/
│   ├── HomeView.vue
│   ├── WasIstMunView.vue
│   ├── KonferenzenView.vue
│   ├── TeilnahmeView.vue
│   ├── ServiceView.vue
│   └── NotFoundView.vue
├── components/
│   ├── layout/               # Navbar, Footer
│   ├── map/                  # DeutschlandMap, EventMarker, EventSidebar, EventMobileSheet
│   ├── conferences/          # ConferenceCard, ConferenceFilters, ConferenceList, Kalender, Karte
│   ├── mun/                  # MunIntroCard, MunInfoLinks, MunCTASection
│   ├── participation/        # ParticipationBlock
│   ├── service/              # ServiceBlock, ContactBackgroundBlock
│   └── icons/                # SocialIcons, FacebookIcon, InstagramIcon, XIcon
├── utils/
│   ├── cityCoordinates.js    # Stadtkoordinaten + CSS-Positionsberechnung für die Karte
│   └── eventPresenter.js     # Datumsformatierung (de-DE / en-GB)
├── locales/
│   ├── de.json               # Deutsche Übersetzungen
│   └── en.json               # Englische Übersetzungen
└── assets/
    └── images/               # Logos, Event-Bilder
```

## Setup

```bash
cd frontend
npm install
npm run dev
```

Läuft auf: `http://localhost:5173`

### Umgebungsvariablen

```env
VITE_API_URL=http://localhost:5000
```

## Build für Produktion

```bash
npm run build
```

Ausgabe im `dist/`-Ordner. Wird in Produktion via nginx (Docker) ausgeliefert.
