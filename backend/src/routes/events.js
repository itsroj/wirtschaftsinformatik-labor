import express from 'express';
import multer from 'multer';
import {
  getEvents,
  getEventById,
  checkTitle,
  createEvent,
  updateEvent,
  deleteEvent,
  uploadEventImage
} from '../controllers/eventController.js';

// Multer Konfiguration für File-Upload (In-Memory)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max
  },
  fileFilter: (req, file, cb) => {
    // Nur Bilder erlauben
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Nur Bilddateien sind erlaubt'), false);
    }
  }
});

// // TODO: Auth Middleware durch Max implementieren
// import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// ============================================
// PUBLIC ROUTES - Für alle Nutzer zugänglich
// ============================================

/**
 * GET /api/events
 * Alle Events abrufen
 * Query-Parameter: city, type, sortBy
 */
router.get('/', getEvents);

/**
 * GET /api/events/check-title?title=...&excludeId=...
 * Prüft ob ein Kurzname bereits existiert
 */
router.get('/check-title', checkTitle);

/**
 * GET /api/events/:id
 * Einzelnes Event abrufen
 */
router.get('/:id', getEventById);

// ============================================
// ADMIN ROUTES - Authentifizierung durch Max
// ============================================
// TODO: Authentifizierung/Authorization Middleware hinzufügen

/**
 * POST /api/events
 * Neues Event erstellen
 * Benötigt: Admin-Authentifizierung (durch Max)
 */
router.post('/', createEvent);
// router.post('/', authenticateToken, createEvent);

/**
 * PUT /api/events/:id
 * Event aktualisieren
 * Benötigt: Admin-Authentifizierung (durch Max)
 */
router.put('/:id', updateEvent);
// router.put('/:id', authenticateToken, updateEvent);

/**
 * DELETE /api/events/:id
 * Event löschen
 * Benötigt: Admin-Authentifizierung (durch Max)
 */
router.delete('/:id', deleteEvent);
// router.delete('/:id', authenticateToken, deleteEvent);

/**
 * POST /api/events/:id/upload-image
 * Event-Bild zu Supabase Storage hochladen
 * Content-Type: multipart/form-data
 * Field: image (file)
 */
router.post('/:id/upload-image', upload.single('image'), uploadEventImage);
// router.post('/:id/upload-image', authenticateToken, upload.single('image'), uploadEventImage);

export default router;
