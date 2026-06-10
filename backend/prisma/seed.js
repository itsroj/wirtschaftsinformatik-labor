import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starte Datenseeding...');

  const adminCount = await prisma.admin.count();
  if (adminCount === 0) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.admin.create({
      data: {
        email: 'admin@dmun.de',
        password: hashedPassword,
        name: 'DMUN Admin'
      }
    });
    console.log('✅ Admin erstellt:', admin.email);
  } else {
    console.log('ℹ️ Admin existiert bereits, überspringe...');
  }

  const eventCount = await prisma.event.count();
  if (eventCount === 0) {
    await prisma.event.create({
      data: {
        title: 'MUNoH',
        longTitle: 'Model United Nations of Hamburg',
        description: 'Model United Nations of Hamburg (MUNOH) ist eine der größten MUN-Konferenzen in Deutschland.',
        city: 'Hamburg',
        date: new Date('2026-09-23'),
        endDate: new Date('2026-09-27'),
        applicationDate: new Date('2026-09-17'),
        firstConference: 2009,
        participants: 250,
        language: 'english',
        type: 'pupil',
        website: 'https://munoh.de/',
      }
    });
    await prisma.event.create({
      data: {
        title: 'DMUN',
        longTitle: 'German Model United Nations',
        description: 'Die größte MUN-Konferenz in Deutschland.',
        city: 'Berlin',
        date: new Date('2026-05-15'),
        endDate: new Date('2026-05-17'),
        applicationDate: new Date('2026-04-01'),
        firstConference: 2010,
        participants: 500,
        language: 'english',
        type: 'student',
        website: 'https://www.dmun.de/',
      }
    });
    await prisma.event.create({
      data: {
        title: 'MUNM',
        longTitle: 'Model United Nations Munich',
        description: 'MUN-Konferenz in München mit internationaler Teilnahme.',
        city: 'Munich',
        date: new Date('2026-11-20'),
        endDate: new Date('2026-11-22'),
        applicationDate: new Date('2026-10-01'),
        firstConference: 2015,
        participants: 300,
        language: 'english',
        type: 'student',
        website: 'https://munmunich.de/',
      }
    });
    console.log('✅ Events erstellt');
  } else {
    console.log('ℹ️ Events existieren bereits, überspringe...');
  }

  console.log('✨ Seeding abgeschlossen!');
}

main()
  .catch((e) => {
    console.error('Fehler beim Seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });