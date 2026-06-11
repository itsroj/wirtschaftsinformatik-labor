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

// Multer konfiguriert den Datei-Upload: Dateien werden im Arbeitsspeicher gehalten (kein Disk-Speicher),
// max. 10 MB, nur Bilddateien erlaubt (geprüft über MIME-Typ)
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

// Öffentliche Routen – kein Login erforderlich
router.get('/', getEvents);

// Prüft ob ein Kurzname schon vergeben ist (genutzt im Admin-Formular für Echtzeit-Validierung)
router.get('/check-title', checkTitle);

// Einzelnes Event mit allen Terminen abrufen
router.get('/:id', getEventById);

// Geschützte Admin-Routen – JWT-Authentifizierung erforderlich
router.post('/', authenticateToken, createEvent);
router.put('/:id', authenticateToken, updateEvent);
router.delete('/:id', authenticateToken, deleteEvent);

// Logo-Upload: Datei wird per multipart/form-data empfangen, zu Supabase Storage hochgeladen
router.post('/:id/upload-image', authenticateToken, upload.single('image'), uploadEventImage);

// Konferenzdaten (Termine) eines Events verwalten – alle ebenfalls geschützt
router.post('/:eventId/conferences', authenticateToken, createConference);
router.put('/:eventId/conferences/:conferenceId', authenticateToken, updateConference);
router.delete('/:eventId/conferences/:conferenceId', authenticateToken, deleteConference);

export default router;
