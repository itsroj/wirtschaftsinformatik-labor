
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validierung
    if (!email || !password) {
      return res.status(400).json({ error: 'E-Mail und Passwort erforderlich' });
    }

    // Benutzer suchen
    const user = await prisma.admin.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Ungültige Anmeldedaten' });
    }

    // Passwort prüfen
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Ungültige Anmeldedaten' });
    }

    // JWT Token generieren
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
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

export const logout = async (req, res) => {
  // Token wird Client-seitig gelöscht
  res.json({ message: 'Erfolgreich abgemeldet' });
};

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

