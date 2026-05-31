# mun-admin

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
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