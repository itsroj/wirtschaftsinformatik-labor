import express from 'express';
import multer from 'multer';
import {
  getEvents,
  getEventById,
  checkTitle,
  createEvent,
  updateEvent,
  deleteEvent,
  uploadEventImage,
  createConference,
  updateConference,
  deleteConference
} from '../controllers/eventController.js';
import { authenticateToken } from '../middleware/auth.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Nur Bilddateien sind erlaubt'), false);
    }
  }
});

const router = express.Router();

// PUBLIC ROUTES
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

// ADMIN ROUTES - geschützt mit Auth
router.post('/', authenticateToken, createEvent);
router.put('/:id', authenticateToken, updateEvent);
router.delete('/:id', authenticateToken, deleteEvent);
router.post('/:id/upload-image', authenticateToken, upload.single('image'), uploadEventImage);

/**
 * Conference CRUD
 */
router.post('/:eventId/conferences', authenticateToken, createConference);
router.put('/:eventId/conferences/:conferenceId', authenticateToken, updateConference);
router.delete('/:eventId/conferences/:conferenceId', authenticateToken, deleteConference);

export default router;
