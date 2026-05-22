import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/events
 * Alle Events abrufen (sortiert nach Startdatum)
 * Optional Filter: city, type
 */
export const getEvents = async (req, res) => {
  try {
    const { city, type, sortBy = 'date' } = req.query;

    const where = {};
    if (city) where.city = city;
    if (type) where.type = type;

    const events = await prisma.event.findMany({
      where,
      orderBy: { [sortBy]: 'asc' }
    });

    res.json(events);
  } catch (error) {
    console.error('Fehler beim Abrufen von Events:', error);
    res.status(500).json({ error: 'Fehler beim Abrufen von Events' });
  }
};

/**
 * GET /api/events/:id
 * Einzelnes Event abrufen
 */
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) }
    });

    if (!event) {
      return res.status(404).json({ error: 'Event nicht gefunden' });
    }

    res.json(event);
  } catch (error) {
    console.error('Fehler beim Abrufen des Events:', error);
    res.status(500).json({ error: 'Fehler beim Abrufen des Events' });
  }
};

/**
 * POST /api/events
 * Neues Event erstellen (Admin only - Authentifizierung durch Max)
 */
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      longTitle,
      description,
      city,
      date,
      endDate,
      applicationDate,
      firstConference,
      participants,
      language,
      type,
      logo,
      website,
      mapPositionTop,
      mapPositionLeft
    } = req.body;

    // Validierung erforderlicher Felder
    if (!title || !longTitle || !city || !date) {
      return res.status(400).json({
        error: 'Erforderliche Felder fehlen: title, longTitle, city, date'
      });
    }

    const event = await prisma.event.create({
      data: {
        title,
        longTitle,
        description: description || '',
        city,
        date: new Date(date),
        endDate: endDate ? new Date(endDate) : null,
        applicationDate: applicationDate ? new Date(applicationDate) : null,
        firstConference: firstConference ? parseInt(firstConference) : null,
        participants: participants ? parseInt(participants) : null,
        language: language || 'english',
        type: type || null,
        logo: logo || null,
        website: website || null,
        mapPositionTop: mapPositionTop || null,
        mapPositionLeft: mapPositionLeft || null
      }
    });

    res.status(201).json(event);
  } catch (error) {
    console.error('Fehler beim Erstellen des Events:', error);
    res.status(500).json({ error: 'Fehler beim Erstellen des Events' });
  }
};

/**
 * PUT /api/events/:id
 * Event aktualisieren (Admin only - Authentifizierung durch Max)
 */
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Prüfe ob Event existiert
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) }
    });

    if (!event) {
      return res.status(404).json({ error: 'Event nicht gefunden' });
    }

    // Konvertiere Datum-Strings zu Date-Objekten
    if (updateData.date) updateData.date = new Date(updateData.date);
    if (updateData.endDate) updateData.endDate = new Date(updateData.endDate);
    if (updateData.applicationDate) updateData.applicationDate = new Date(updateData.applicationDate);
    if (updateData.firstConference) updateData.firstConference = parseInt(updateData.firstConference);
    if (updateData.participants) updateData.participants = parseInt(updateData.participants);

    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    res.json(updatedEvent);
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Events:', error);
    res.status(500).json({ error: 'Fehler beim Aktualisieren des Events' });
  }
};

/**
 * DELETE /api/events/:id
 * Event löschen (Admin only - Authentifizierung durch Max)
 */
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) }
    });

    if (!event) {
      return res.status(404).json({ error: 'Event nicht gefunden' });
    }

    await prisma.event.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      message: 'Event erfolgreich gelöscht',
      deletedId: parseInt(id)
    });
  } catch (error) {
    console.error('Fehler beim Löschen des Events:', error);
    res.status(500).json({ error: 'Fehler beim Löschen des Events' });
  }
};
