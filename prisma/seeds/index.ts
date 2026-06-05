import { PrismaPg } from '@prisma/adapter-pg';
import { consola } from 'consola';

import { PrismaClient } from '../../prisma/generated/client/client.js';
import { seedAcademicSessions } from './academicSessions';
import { seedAdmins } from './admins';
import { seedAnnouncements } from './announcements';
import { seedBuildings } from './buildings';
import { seedFaculties } from './faculties';
import { seedHousingApplications } from './housingApplications';
import { seedLodgments } from './lodgments';
import { seedMaintainers } from './maintainers';
import { seedMaintenances } from './maintenances';
import { seedRenewals } from './renewals';
import { seedResidents } from './residents';
import { seedUsers } from './users';

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter: pool });

const main = async () => {
  consola.start('Seeding database…');

  consola.info('Seeding faculties…');
  await seedFaculties(prisma);

  consola.info('Seeding academic sessions…');
  await seedAcademicSessions(prisma);

  consola.info('Seeding buildings…');
  await seedBuildings(prisma);

  consola.info('Seeding lodgments…');
  await seedLodgments(prisma);

  consola.info('Seeding users & identities…');
  await seedUsers(prisma);

  consola.info('Seeding admins…');
  await seedAdmins(prisma);

  consola.info('Seeding residents…');
  await seedResidents(prisma);

  consola.info('Seeding housing applications…');
  await seedHousingApplications(prisma);

  consola.info('Seeding renewals…');
  await seedRenewals(prisma);

  consola.info('Seeding maintainers…');
  await seedMaintainers(prisma);

  consola.info('Seeding maintenances…');
  await seedMaintenances(prisma);

  consola.info('Audit log entries created within domain seeds.');

  consola.info('Seeding announcements…');
  await seedAnnouncements(prisma);

  consola.success('Database seeded successfully.');
};

main()
  .catch(async e => {
    consola.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
