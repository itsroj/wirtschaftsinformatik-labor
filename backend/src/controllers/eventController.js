import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';

const prisma = new PrismaClient();

// Supabase Client für Storage
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    realtime: {
      transport: ws
    }
  }
);

/**
 * GET /api/events/check-title?title=...&excludeId=...
 * Prüft ob ein Kurzname (title) bereits in der Datenbank existiert.
 * excludeId: optional, wird beim Bearbeiten genutzt um das eigene Event auszuschließen
 */
export const checkTitle = async (req, res) => {
  try {
    const { title, excludeId } = req.query;
    if (!title || !title.trim()) {
      return res.json({ exists: false });
    }

    const where = {
      title: { equals: title.trim(), mode: 'insensitive' }
    };
    if (excludeId) {
      where.id = { not: parseInt(excludeId) };
    }

    const existing = await prisma.event.findFirst({ where, select: { id: true } });
    res.json({ exists: !!existing });
  } catch (error) {
    console.error('Fehler beim Prüfen des Kurznamens:', error.message);
    res.status(500).json({ error: 'Fehler beim Prüfen des Kurznamens' });
  }
};

/**
 * GET /api/events
 * Alle Events abrufen mit ihren Conferences
 * Optional Filter: city, type
 */
export const getEvents = async (req, res) => {
  try {
    const { city, type } = req.query;

    const where = {};
    if (city) where.city = city;
    if (type) where.type = type;

    const events = await prisma.event.findMany({
      where,
      include: { 
        conferences: {
          orderBy: { date: 'desc' }
        }
      }
    });

    res.json(events);
  } catch (error) {
    console.error('❌ Fehler beim Abrufen von Events:');
    console.error('   Message:', error.message);
    console.error('   Code:', error.code);
    console.error('   Stack:', error.stack);
    res.status(500).json({ error: 'Fehler beim Abrufen von Events', details: error.message });
  }
};

/**
 * GET /api/events/:id
 * Einzelnes Event abrufen mit seinen Conferences
 */
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
      include: {
        conferences: {
          orderBy: { date: 'desc' }
        }
      }
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
 * Neues Event erstellen
 */
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      longTitle,
      description_de,
      description_en,
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
      instagramLink,
      facebookLink
    } = req.body;

    if (!title || !longTitle || !city) {
      return res.status(400).json({
        error: 'Erforderliche Felder fehlen: title, longTitle, city'
      });
    }

    const eventData = {
      title,
      longTitle,
      description_de: description_de || '',
      description_en: description_en || '',
      city,
      firstConference: firstConference ? parseInt(firstConference) : null,
      participants: participants ? parseInt(participants) : null,
      language: language || 'english',
      type: type || null,
      logo: logo || null,
      website: website || null,
      instagramLink: instagramLink || null,
      facebookLink: facebookLink || null
    };
    
    if (date) {
      eventData.conferences = {
        create: {
          date: new Date(date),
          endDate: endDate ? new Date(endDate) : null,
          applicationDate: applicationDate ? new Date(applicationDate) : null
        }
      };
    }
    
    const event = await prisma.event.create({
      data: eventData,
      include: { conferences: true }
    });

    res.status(201).json(event);
  } catch (error) {
    console.error('❌ Fehler beim Erstellen des Events:');
    console.error('   Message:', error.message);
    console.error('   Stack:', error.stack);
    res.status(500).json({ 
      error: 'Fehler beim Erstellen des Events',
      details: error.message
    });
  }
};

/**
 * PUT /api/events/:id
 * Event aktualisieren
 */
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) }
    });

    if (!event) {
      return res.status(404).json({ error: 'Event nicht gefunden' });
    }

    if (updateData.date) updateData.date = new Date(updateData.date);
    if (updateData.endDate) updateData.endDate = new Date(updateData.endDate);
    if (updateData.applicationDate) updateData.applicationDate = new Date(updateData.applicationDate);
    if (updateData.firstConference) updateData.firstConference = parseInt(updateData.firstConference);
    if (updateData.participants) updateData.participants = parseInt(updateData.participants);

    const { date, endDate, applicationDate, ...eventData } = updateData;
    
    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(id) },
      data: eventData,
      include: { conferences: { orderBy: { date: 'desc' } } }
    });
    
    if (date) {
      await prisma.conference.upsert({
        where: {
          eventId_date: {
            eventId: parseInt(id),
            date: new Date(date)
          }
        },
        update: {
          endDate: endDate ? new Date(endDate) : null,
          applicationDate: applicationDate ? new Date(applicationDate) : null
        },
        create: {
          eventId: parseInt(id),
          date: new Date(date),
          endDate: endDate ? new Date(endDate) : null,
          applicationDate: applicationDate ? new Date(applicationDate) : null
        }
      });
    }

    const finalEvent = await prisma.event.findUnique({
      where: { id: parseInt(id) },
      include: { conferences: { orderBy: { date: 'desc' } } }
    });
    
    res.json(finalEvent);
  } catch (error) {
    console.error('❌ Fehler beim Aktualisieren des Events:');
    console.error('   Message:', error.message);
    console.error('   Stack:', error.stack);
    res.status(500).json({ 
      error: 'Fehler beim Aktualisieren des Events',
      details: error.message
    });
  }
};

/**
 * POST /api/events/:eventId/conferences
 * Neue Konferenz für ein Event erstellen
 */
export const createConference = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { date, endDate, applicationDate } = req.body;

    if (!date) {
      return res.status(400).json({ error: 'Startdatum ist erforderlich' });
    }

    const event = await prisma.event.findUnique({ where: { id: parseInt(eventId) } });
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
    console.error('Fehler beim Erstellen der Konferenz:', error.message);
    res.status(500).json({ error: 'Fehler beim Erstellen der Konferenz', details: error.message });
  }
};

/**
 * PUT /api/events/:eventId/conferences/:conferenceId
 * Konferenz aktualisieren
 */
export const updateConference = async (req, res) => {
  try {
    const { eventId, conferenceId } = req.params;
    const { date, endDate, applicationDate } = req.body;

    if (!date) {
      return res.status(400).json({ error: 'Startdatum ist erforderlich' });
    }

    const conference = await prisma.conference.findFirst({
      where: { id: parseInt(conferenceId), eventId: parseInt(eventId) }
    });
    if (!conference) {
      return res.status(404).json({ error: 'Konferenz nicht gefunden' });
    }

    const updated = await prisma.conference.update({
      where: { id: parseInt(conferenceId) },
      data: {
        date: new Date(date),
        endDate: endDate ? new Date(endDate) : null,
        applicationDate: applicationDate ? new Date(applicationDate) : null
      }
    });

    res.json(updated);
  } catch (error) {
    console.error('Fehler beim Aktualisieren der Konferenz:', error.message);
    res.status(500).json({ error: 'Fehler beim Aktualisieren der Konferenz', details: error.message });
  }
};

/**
 * DELETE /api/events/:eventId/conferences/:conferenceId
 * Konferenz löschen
 */
export const deleteConference = async (req, res) => {
  try {
    const { eventId, conferenceId } = req.params;

    const conference = await prisma.conference.findFirst({
      where: { id: parseInt(conferenceId), eventId: parseInt(eventId) }
    });
    if (!conference) {
      return res.status(404).json({ error: 'Konferenz nicht gefunden' });
    }

    await prisma.conference.delete({ where: { id: parseInt(conferenceId) } });
    res.json({ message: 'Konferenz erfolgreich gelöscht', deletedId: parseInt(conferenceId) });
  } catch (error) {
    console.error('Fehler beim Löschen der Konferenz:', error.message);
    res.status(500).json({ error: 'Fehler beim Löschen der Konferenz', details: error.message });
  }
};

/**
 * DELETE /api/events/:id
 * Event löschen
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

/**
 * POST /api/events/:id/upload-image
 * Event-Bild zu Supabase Storage hochladen
 */
export const uploadEventImage = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) }
    });

    if (!event) {
      return res.status(404).json({ error: 'Event nicht gefunden' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Keine Datei hochgeladen' });
    }

    if (event.logo) {
      try {
        let oldObjectPath = null;
        try {
          const u = new URL(event.logo);
          const marker = '/storage/v1/object/public/';
          const idx = u.pathname.indexOf(marker);
          if (idx !== -1) {
            const key = u.pathname.substring(idx + marker.length);
            if (key.startsWith('event-images/')) {
              oldObjectPath = key.substring('event-images/'.length);
            } else {
              oldObjectPath = key;
            }
          }
        } catch (e) {
          const lastIdx = event.logo.lastIndexOf('/event-images/');
          if (lastIdx !== -1) {
            oldObjectPath = event.logo.substring(lastIdx + '/event-images/'.length);
          }
        }

        if (oldObjectPath) {
          const { error: deleteErr } = await supabase.storage
            .from('event-images')
            .remove([oldObjectPath]);

          if (deleteErr) {
            console.warn('⚠️ Fehler beim Löschen des alten Bildes:', deleteErr.message || deleteErr);
          } else {
            console.log(`✅ Altes Bild gelöscht: ${oldObjectPath}`);
          }
        }
      } catch (deleteError) {
        console.warn('⚠️ Fehler beim Löschen des alten Bildes:', deleteError.message || deleteError);
      }
    }

    const timestamp = Date.now();
    const fileName = `event-${id}-${timestamp}-${req.file.originalname}`;
    const filePath = fileName;
    const fileBuffer = req.file.buffer;

    const { data, error: uploadError } = await supabase.storage
      .from('event-images')
      .upload(filePath, fileBuffer, {
        contentType: req.file.mimetype,
        upsert: false
      });

    if (uploadError) {
      console.error('❌ Supabase Upload Error:', uploadError);
      return res.status(500).json({ 
        error: 'Fehler beim Upload zu Supabase Storage',
        details: uploadError.message
      });
    }

    const { data: publicUrlData } = supabase.storage
      .from('event-images')
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(id) },
      data: { logo: publicUrl },
      include: { conferences: { orderBy: { date: 'desc' } } }
    });

    res.json({
      message: 'Bild erfolgreich hochgeladen und altes Bild gelöscht',
      imageUrl: publicUrl,
      event: updatedEvent
    });
  } catch (error) {
    console.error('Fehler beim Hochladen des Bildes:', error);
    res.status(500).json({ error: 'Fehler beim Hochladen des Bildes' });
  }
};