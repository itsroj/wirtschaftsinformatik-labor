import express from 'express';
import { login, logout, getCurrentUser, updateAdmin } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticateToken, getCurrentUser);
router.put('/update', authenticateToken, updateAdmin);

export default router;