import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Event Routes (deine Implementierung)
import eventRoutes from './routes/events.js';

import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();



// MIDDLEWARE
// CORS erlaubt Anfragen vom Frontend (Vite Dev-Server auf Port 5173/5174)
// express.json() parst eingehende JSON-Request-Bodies automatisch
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Jede eingehende Anfrage wird mit Timestamp, HTTP-Methode und Pfad geloggt
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});




// Einfacher Statusendpunkt – zeigt an ob der Server erreichbar ist
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend läuft',
    timestamp: new Date().toISOString()
  });
});





// API ROUTES

// Events Routes
app.use('/api/events', eventRoutes);

app.use('/api/auth', authRoutes);




// ERROR HANDLING

// Greift wenn keine Route dem Pfad entspricht – gibt 404 mit Pfad- und Methoden-Info zurück
app.use((req, res) => {
  res.status(404).json({
    error: 'Route nicht gefunden',
    path: req.path,
    method: req.method
  });
});

// Fängt alle unbehandelten Fehler ab und gibt eine strukturierte JSON-Antwort zurück
// Wird von Express aufgerufen wenn next(err) in einem Route-Handler aufgerufen wird
app.use((err, req, res, next) => {
  console.error('Fehler:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Interner Serverfehler',
      status: err.status || 500
    }
  });
});






// SERVER START
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  DMUN Backend startet                  ║
╠════════════════════════════════════════╣
║  Port:      ${PORT}                    ║
║  Umgebung:  ${NODE_ENV}                ║
║  Status:    ✅ Bereit                  ║
╚════════════════════════════════════════╝
  `);
});

// Graceful Shutdown (später für Produktionsserver)
process.on('SIGINT', async () => {
  console.log('\n⏹️  Fahre Backend herunter...');
  await prisma.$disconnect();
  process.exit(0);
});
