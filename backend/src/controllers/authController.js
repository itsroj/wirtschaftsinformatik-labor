import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

/**
 * POST /api/auth/login
 * Meldet einen Admin-Nutzer an.
 * Empfängt E-Mail + Passwort, sucht den Admin in der DB, vergleicht das gehashte Passwort (bcrypt)
 * und gibt bei Erfolg ein JWT zurück, das die Session für 24h authorisiert.
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'E-Mail und Passwort erforderlich' });
    }

    const user = await prisma.admin.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Ungültige Anmeldedaten' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Ungültige Anmeldedaten' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Fehler beim Login:', error);
    res.status(500).json({ error: 'Fehler beim Login' });
  }
};

/**
 * POST /api/auth/logout
 * Abmeldung – gibt eine Erfolgsantwort zurück. Das JWT selbst wird client-seitig gelöscht.
 */
export const logout = async (req, res) => {
  res.json({ message: 'Erfolgreich abgemeldet' });
};

/**
 * GET /api/auth/me
 * Gibt die Daten des aktuell eingeloggten Admins zurück (ID, E-Mail, Name).
 * Nutzt req.userId, das von der Auth-Middleware aus dem JWT extrahiert wurde.
 */
export const getCurrentUser = async (req, res) => {
  try {
    const user = await prisma.admin.findUnique({
      where: { id: req.userId },
      select: { id: true, email: true, name: true }
    });

    if (!user) {
      return res.status(404).json({ error: 'Benutzer nicht gefunden' });
    }

    res.json(user);
  } catch (error) {
    console.error('Fehler beim Abrufen des aktuellen Benutzers:', error);
    res.status(500).json({ error: 'Fehler beim Abrufen des Benutzers' });
  }
};

/**
 * PUT /api/auth/update
 * Aktualisiert E-Mail und/oder Passwort des eingeloggten Admins.
 * Passwort-Änderung: altes Passwort wird erst per bcrypt geprüft, neues wird gehasht gespeichert.
 * Felder die nicht übergeben werden, bleiben unverändert.
 */
export const updateAdmin = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const user = await prisma.admin.findUnique({
      where: { id: req.userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'Benutzer nicht gefunden' });
    }

    const updateData = {};

    if (email) {
      updateData.email = email;
    }

    if (currentPassword && newPassword) {
      const passwordMatch = await bcrypt.compare(currentPassword, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Aktuelles Passwort ist falsch' });
      }
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await prisma.admin.update({
      where: { id: req.userId },
      data: updateData,
      select: { id: true, email: true, name: true }
    });

    res.json({ message: 'Erfolgreich aktualisiert', user: updatedUser });

  } catch (error) {
    console.error('Fehler beim Aktualisieren:', error);
    res.status(500).json({ error: 'Fehler beim Aktualisieren' });
  }
};