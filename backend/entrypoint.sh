#!/bin/sh
echo "⏳ Warte auf Datenbank..."

until nc -z postgres 5432; do
  echo "⏳ Datenbank noch nicht bereit, warte..."
  sleep 2
done

echo "✅ Datenbank ist bereit!"

echo "🔄 Führe Migrationen aus..."
npx prisma migrate deploy

echo "🌱 Führe Seed aus..."
node prisma/seed.js

echo "🚀 Starte Backend..."
node src/index.js