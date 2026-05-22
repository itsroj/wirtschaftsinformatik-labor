import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starte Datenseeding...');

  // Event 1: MUNoH
  const event1 = await prisma.event.create({
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
      logo: '@/assets/images/events/munoh.png',
      website: 'https://munoh.de/',
      mapPositionTop: '21%',
      mapPositionLeft: '45%'
    }
  });
  console.log('✅ Event erstellt:', event1.title);

  // Event 2: DMUN
  const event2 = await prisma.event.create({
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
      logo: '@/assets/images/events/dmun.png',
      website: 'https://www.dmun.de/',
      mapPositionTop: '15%',
      mapPositionLeft: '52%'
    }
  });
  console.log('✅ Event erstellt:', event2.title);

  // Event 3: MUNM
  const event3 = await prisma.event.create({
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
      logo: '@/assets/images/events/munm.png',
      website: 'https://munmunich.de/',
      mapPositionTop: '25%',
      mapPositionLeft: '49%'
    }
  });
  console.log('✅ Event erstellt:', event3.title);

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
