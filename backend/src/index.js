import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Event Routes (deine Implementierung)
import eventRoutes from './routes/events.js';

import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();



// MIDDLEWARE
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request-Logging Middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});




// HEALTH CHECK
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

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Fehler:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Interner Serverfehler',
      status: err.status || 500
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route nicht gefunden',
    path: req.path,
    method: req.method
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
