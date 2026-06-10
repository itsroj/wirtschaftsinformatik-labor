import express from 'express';
import multer from 'multer';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  uploadEventImage
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
router.get('/:id', getEventById);

// ADMIN ROUTES - geschützt mit Auth
router.post('/', authenticateToken, createEvent);
router.put('/:id', authenticateToken, updateEvent);
router.delete('/:id', authenticateToken, deleteEvent);
router.post('/:id/upload-image', authenticateToken, upload.single('image'), uploadEventImage);

export default router;