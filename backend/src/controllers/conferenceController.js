import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/events/:eventId/conferences
 * Alle Konferenzen für ein Event
 */
export const getConferencesByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const conferences = await prisma.conference.findMany({
      where: { eventId: parseInt(eventId) },
      orderBy: { date: 'desc' }
    });

    res.json(conferences);
  } catch (error) {
    console.error('Fehler beim Abrufen der Konferenzen:', error);
    res.status(500).json({ error: 'Fehler beim Abrufen der Konferenzen' });
  }
};

/**
 * POST /api/events/:eventId/conferences
 * Neue Konferenz (Termin) für Event erstellen
 */
export const createConference = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { date, endDate, applicationDate } = req.body;

    // Validierung
    if (!date) {
      return res.status(400).json({
        error: 'Erforderliche Felder fehlen: date'
      });
    }

    // Überprüfe, ob Event existiert
    const event = await prisma.event.findUnique({
      where: { id: parseInt(eventId) }
    });

    if (!event) {
      return res.status(404).json({ error: 'Event nicht gefunden' });
    }

    const conference = await prisma.conference.create({
      data: {
        eventId: parseInt(eventId),
        date: new Date(date),
        endDate: endDate ? new Date(endDate) : null,
        applicationDate: applicationDate ? new Date(applicationDate) : null
      }
    });

    res.status(201).json(conference);
  } catch (error) {
    console.error('Fehler beim Erstellen der Konferenz:', error);
    
    // Handle unique constraint violation (same event + date)
    if (error.code === 'P2002') {
      return res.status(409).json({
        error: 'Eine Konferenz mit diesem Datum für dieses Event existiert bereits'
      });
    }
    
    res.status(500).json({ error: 'Fehler beim Erstellen der Konferenz' });
  }
};

/**
 * PUT /api/conferences/:id
 * Konferenz aktualisieren
 */
export const updateConference = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, endDate, applicationDate } = req.body;

    // Überprüfe, ob Konferenz existiert
    const conference = await prisma.conference.findUnique({
      where: { id: parseInt(id) }
    });

    if (!conference) {
      return res.status(404).json({ error: 'Konferenz nicht gefunden' });
    }

    const updateData = {};
    if (date) updateData.date = new Date(date);
    if (endDate !== undefined) updateData.endDate = endDate ? new Date(endDate) : null;
    if (applicationDate !== undefined) updateData.applicationDate = applicationDate ? new Date(applicationDate) : null;

    const updated = await prisma.conference.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    res.json(updated);
  } catch (error) {
    console.error('Fehler beim Aktualisieren der Konferenz:', error);
    
    if (error.code === 'P2002') {
      return res.status(409).json({
        error: 'Eine Konferenz mit diesem Datum für dieses Event existiert bereits'
      });
    }
    
    res.status(500).json({ error: 'Fehler beim Aktualisieren der Konferenz' });
  }
};

/**
 * DELETE /api/conferences/:id
 * Konferenz löschen
 */
export const deleteConference = async (req, res) => {
  try {
    const { id } = req.params;

    const conference = await prisma.conference.findUnique({
      where: { id: parseInt(id) }
    });

    if (!conference) {
      return res.status(404).json({ error: 'Konferenz nicht gefunden' });
    }

    await prisma.conference.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Konferenz gelöscht' });
  } catch (error) {
    console.error('Fehler beim Löschen der Konferenz:', error);
    res.status(500).json({ error: 'Fehler beim Löschen der Konferenz' });
  }
};
