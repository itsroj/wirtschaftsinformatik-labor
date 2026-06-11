# Drittkomponenten und Lizenzen

Übersicht aller verwendeten Open-Source-Bibliotheken und deren Lizenzbedingungen.  
Stand: Juni 2026

---

## Frontend (`frontend/`)

| Paket | Version | Lizenz | Zweck |
|---|---|---|---|
| [vue](https://github.com/vuejs/core) | ^3.5.32 | MIT | Haupt-Frontend-Framework |
| [vue-router](https://github.com/vuejs/router) | ^5.0.6 | MIT | Client-seitiges Routing |
| [pinia](https://github.com/vuejs/pinia) | ^3.0.4 | MIT | State Management |
| [@fullcalendar/core](https://github.com/fullcalendar/fullcalendar) | ^6.1.20 | MIT | Kalender-Bibliothek (Basis) |
| [@fullcalendar/daygrid](https://github.com/fullcalendar/fullcalendar) | ^6.1.20 | MIT | Kalender-Plugin: Monatsansicht |
| [@fullcalendar/vue3](https://github.com/fullcalendar/fullcalendar) | ^6.1.20 | MIT | FullCalendar Vue 3 Integration |
| [@lucide/vue](https://github.com/lucide-icons/lucide) | ^1.16.0 | ISC | Icon-Bibliothek (SVG-Icons) |
| [leaflet](https://github.com/Leaflet/Leaflet) | ^1.9.4 | BSD-2-Clause | Interaktive Karten (nicht aktiv genutzt) |
| [@vue-leaflet/vue-leaflet](https://github.com/vue-leaflet/vue-leaflet) | ^0.10.1 | MIT | Vue 3 Wrapper für Leaflet (nicht aktiv genutzt) |
| [leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) | ^1.5.3 | MIT | Marker-Clustering für Leaflet (nicht aktiv genutzt) |

### Frontend DevDependencies

| Paket | Version | Lizenz | Zweck |
|---|---|---|---|
| [vite](https://github.com/vitejs/vite) | ^8.0.8 | MIT | Build-Tool und Dev-Server |
| [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue) | ^6.0.6 | MIT | Vue Single File Component Support für Vite |
| [vite-plugin-vue-devtools](https://github.com/vuejs/devtools) | ^8.1.1 | MIT | Vue DevTools Integration |

---

## Admin-Frontend (`mun-admin/`)

| Paket | Version | Lizenz | Zweck |
|---|---|---|---|
| [vue](https://github.com/vuejs/core) | ^3.5.32 | MIT | Haupt-Frontend-Framework |
| [vue-router](https://github.com/vuejs/router) | ^5.0.4 | MIT | Client-seitiges Routing |
| [pinia](https://github.com/vuejs/pinia) | ^3.0.4 | MIT | State Management |

### Admin DevDependencies

| Paket | Version | Lizenz | Zweck |
|---|---|---|---|
| [vite](https://github.com/vitejs/vite) | ^8.0.8 | MIT | Build-Tool und Dev-Server |
| [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue) | ^6.0.6 | MIT | Vue Single File Component Support für Vite |
| [vite-plugin-vue-devtools](https://github.com/vuejs/devtools) | ^8.1.1 | MIT | Vue DevTools Integration |

---

## Backend (`backend/`)

| Paket | Version | Lizenz | Zweck |
|---|---|---|---|
| [express](https://github.com/expressjs/express) | ^4.18.0 | MIT | Web-Framework für Node.js |
| [@prisma/client](https://github.com/prisma/prisma) | ^5.22.0 | Apache-2.0 | Datenbankzugriff / ORM (PostgreSQL) |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | ^9.0.3 | MIT | JWT-Erstellung und -Verifizierung (Admin-Auth) |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | ^3.0.3 | MIT | Passwort-Hashing |
| [cors](https://github.com/expressjs/cors) | ^2.8.5 | MIT | Cross-Origin Resource Sharing Middleware |
| [dotenv](https://github.com/motdotla/dotenv) | ^16.0.0 | BSD-2-Clause | Laden von Umgebungsvariablen aus `.env` |
| [multer](https://github.com/expressjs/multer) | ^2.1.1 | MIT | Datei-Upload Middleware (Logo-Upload) |
| [@supabase/supabase-js](https://github.com/supabase/supabase-js) | ^2.108.0 | MIT | Supabase Storage Client (Logo-Speicherung) |
| [ws](https://github.com/websockets/ws) | ^8.21.0 | MIT | WebSocket-Implementierung (Supabase Realtime) |

### Backend DevDependencies

| Paket | Version | Lizenz | Zweck |
|---|---|---|---|
| [prisma](https://github.com/prisma/prisma) | ^5.22.0 | Apache-2.0 | Prisma CLI (Migrationen, Schema-Management) |
| [nodemon](https://github.com/remy/nodemon) | ^3.0.2 | MIT | Automatischer Neustart bei Dateiänderungen (Dev) |

---

## Lizenztexte

### MIT License

> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.

Vollständige Texte: [choosealicense.com/licenses/mit](https://choosealicense.com/licenses/mit/)

### Apache 2.0 License (Prisma)

Vollständiger Text: [choosealicense.com/licenses/apache-2.0](https://choosealicense.com/licenses/apache-2.0/)

### BSD-2-Clause License (Leaflet, dotenv)

Vollständiger Text: [choosealicense.com/licenses/bsd-2-clause](https://choosealicense.com/licenses/bsd-2-clause/)

### ISC License (Lucide)

Vollständiger Text: [choosealicense.com/licenses/isc](https://choosealicense.com/licenses/isc/)

---

## Hinweis

Alle verwendeten Pakete stehen unter Open-Source-Lizenzen (MIT, Apache 2.0, BSD-2-Clause, ISC), die eine freie Nutzung, Modifikation und Weitergabe – auch für kommerzielle Zwecke – erlauben, sofern bestehende Copyright-Hinweise erhalten bleiben.
