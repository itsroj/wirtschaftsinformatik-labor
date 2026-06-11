import express from 'express';
import { login, logout, getCurrentUser, updateAdmin } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Öffentliche Auth-Routen – kein Token erforderlich
router.post('/login', login);    // Anmeldung: gibt JWT zurück
router.post('/logout', logout);  // Abmeldung: Token wird client-seitig gelöscht

// Geschützte Routen – nur für eingeloggte Admins
router.get('/me', authenticateToken, getCurrentUser);        // Gibt Daten des eingeloggten Admins zurück
router.put('/update', authenticateToken, updateAdmin);       // E-Mail oder Passwort ändern

export default router;