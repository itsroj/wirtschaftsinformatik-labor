import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

// Supabase Client für Storage
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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

    // Include conferences to get all the conference dates
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
      instagramLink,
      facebookLink
    } = req.body;

    // Validierung erforderlicher Felder
    if (!title || !longTitle || !city) {
      return res.status(400).json({
        error: 'Erforderliche Felder fehlen: title, longTitle, city'
      });
    }

    // Erstelle Event und ggf. Conference
    const eventData = {
      title,
      longTitle,
      description: description || '',
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
    
    // Falls date vorhanden, erstelle Conference im selben Call
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

    // Falls Konferenz-Daten gesendet werden, erstelle eine neue Conference
    const { date, endDate, applicationDate, ...eventData } = updateData;
    
    const updatedEvent = await prisma.event.update({
      where: { id: parseInt(id) },
      data: eventData,
      include: { conferences: { orderBy: { date: 'desc' } } }
    });
    
    // Erstelle oder aktualisiere Conference wenn date-Daten vorhanden
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

    // Hole aktualisiertes Event mit Conferences
    const finalEvent = await prisma.event.findUnique({
      where: { id: parseInt(id) },
      include: { conferences: { orderBy: { date: 'desc' } } }
    });
    
    res.json(finalEvent);
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

/**
 * POST /api/events/:id/upload-image
 * Event-Bild zu Supabase Storage hochladen
 * Falls bereits ein Bild existiert, wird das alte gelöscht und ersetzt
 */
export const uploadEventImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Prüfe ob Event existiert
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) }
    });

    if (!event) {
      return res.status(404).json({ error: 'Event nicht gefunden' });
    }

    // Prüfe ob Datei vorhanden
    if (!req.file) {
      return res.status(400).json({ error: 'Keine Datei hochgeladen' });
    }

    // Lösche altes Bild, falls vorhanden
    if (event.logo) {
      try {
        // Versuche robuste Extraktion des Objekt-Pfads in der Bucket
        let oldObjectPath = null;
        try {
          const u = new URL(event.logo);
          const marker = '/storage/v1/object/public/';
          const idx = u.pathname.indexOf(marker);
          if (idx !== -1) {
            const key = u.pathname.substring(idx + marker.length); // e.g. 'event-images/...' or 'some/path'
            // Wenn der key mit dem Bucket-Namen beginnt, entferne diesen Teil
            if (key.startsWith('event-images/')) {
              oldObjectPath = key.substring('event-images/'.length);
            } else {
              oldObjectPath = key;
            }
          }
        } catch (e) {
          // Fallback: suche nach dem letzten '/event-images/' Teil in der URL
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
            console.warn('⚠️ Supabase remove() returned error when deleting old image:', deleteErr.message || deleteErr);
          } else {
            console.log(`✅ Altes Bild gelöscht: ${oldObjectPath}`);
          }
        }
      } catch (deleteError) {
        console.warn('⚠️ Fehler beim Löschen des alten Bildes (allgemein):', deleteError.message || deleteError);
        // Nicht kritisch - Upload fortsetzen
      }
    }

    // Erstelle eindeutigen Dateinamen für neues Bild
    const timestamp = Date.now();
    const fileName = `event-${id}-${timestamp}-${req.file.originalname}`;
    // Wir speichern das Objekt *innerhalb* des Buckets ohne doppeltes Präfix
    const filePath = fileName;

    // Lese Datei-Buffer
    const fileBuffer = req.file.buffer;

    // Uploade zu Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from('event-images')
      .upload(filePath, fileBuffer, {
        contentType: req.file.mimetype,
        upsert: false
      });

    if (uploadError) {
      console.error('❌ Supabase Upload Error:', uploadError);
      console.error('   Message:', uploadError.message);
      console.error('   Status:', uploadError.status);
      console.error('   File Path:', filePath);
      console.error('   File Size:', fileBuffer.length, 'bytes');
      return res.status(500).json({ 
        error: 'Fehler beim Upload zu Supabase Storage',
        details: uploadError.message
      });
    }

    // Erstelle öffentliche URL
    const { data: publicUrlData } = supabase.storage
      .from('event-images')
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    // Aktualisiere Event mit neuer Image-URL
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
