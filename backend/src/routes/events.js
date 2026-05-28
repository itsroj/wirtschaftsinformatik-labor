import express from 'express';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js';

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

export default router;
