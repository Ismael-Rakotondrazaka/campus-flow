import type { PrismaClient } from '../../prisma/generated/client/client.js';

const bb = (n: number) =>
  `bb000000-0000-0000-0000-${String(n).padStart(12, '0')}`;
const ff = (n: number) =>
  `ff000000-0000-0000-0000-${String(n).padStart(12, '0')}`;
const ab = (n: number) =>
  `ab000000-0000-0000-0000-${String(n).padStart(12, '0')}`;
const ae = (n: number) =>
  `ae000000-0000-0000-0000-${String(n).padStart(12, '0')}`;

const MAINT1 = 'aa000000-0000-0000-0000-000000000002';
const MAINT2 = 'aa000000-0000-0000-0000-000000000003';

export const seedMaintenances = async (prisma: PrismaClient) => {
  await prisma.maintenance.createMany({
    data: [
      // --- Session 2023 - done ---
      {
        createdAt: new Date('2023-03-01T09:00:00Z'),
        description:
          'Les lumières de la chambre ne fonctionnent pas. Court-circuit détecté.',
        endAt: new Date('2023-03-20T16:00:00Z'),
        id: ae(1),
        lodgmentId: ff(1),
        residentId: bb(1),
        startAt: new Date('2023-03-10T08:00:00Z'),
        status: 'done',
        type: 'electrical',
      },
      {
        createdAt: new Date('2023-03-28T09:00:00Z'),
        description:
          "Fuite d'eau détectée sous l'évier. Écoulement lent dans la douche.",
        endAt: new Date('2023-04-12T16:00:00Z'),
        id: ae(2),
        lodgmentId: ff(3),
        residentId: bb(3),
        startAt: new Date('2023-04-05T08:00:00Z'),
        status: 'done',
        type: 'plumbing',
      },
      // --- Session 2023 - refused ---
      {
        createdAt: new Date('2023-05-10T09:00:00Z'),
        description: 'Le sèche-linge dans la buanderie ne chauffe plus.',
        id: ae(3),
        lodgmentId: ff(5),
        residentId: bb(5),
        status: 'refused',
        type: 'equipment',
      },
      {
        createdAt: new Date('2023-07-03T09:00:00Z'),
        description:
          "L'air conditionné ne refroidit pas. Bruit étrange au niveau du système de ventilation.",
        id: ae(4),
        lodgmentId: ff(7),
        residentId: bb(7),
        status: 'refused',
        type: 'hvac',
      },
      // --- Session 2024 - done ---
      {
        createdAt: new Date('2024-02-05T09:00:00Z'),
        description:
          'Robinet défectueux dans la salle de bain. Canalisation bouchée.',
        endAt: new Date('2024-02-22T16:00:00Z'),
        id: ae(5),
        lodgmentId: ff(11),
        residentId: bb(11),
        startAt: new Date('2024-02-15T08:00:00Z'),
        status: 'done',
        type: 'plumbing',
      },
      {
        createdAt: new Date('2024-03-01T09:00:00Z'),
        description:
          'Interrupteur défectueux dans la salle de bain. Prise électrique lâche.',
        endAt: new Date('2024-03-18T16:00:00Z'),
        id: ae(6),
        lodgmentId: ff(13),
        residentId: bb(13),
        startAt: new Date('2024-03-10T08:00:00Z'),
        status: 'done',
        type: 'electrical',
      },
      // --- Session 2024 - refused ---
      {
        createdAt: new Date('2024-05-12T09:00:00Z'),
        description:
          "Fenêtre cassée dans la salle de séjour commune. Problème d'accès au réseau Wi-Fi.",
        id: ae(7),
        lodgmentId: ff(15),
        residentId: bb(15),
        status: 'refused',
        type: 'other',
      },
      {
        createdAt: new Date('2024-08-20T09:00:00Z'),
        description:
          'La machine à laver dans la buanderie commune est hors service.',
        id: ae(8),
        lodgmentId: ff(17),
        residentId: bb(17),
        status: 'refused',
        type: 'equipment',
      },
      // --- Current 2025 - pending ---
      {
        createdAt: new Date('2025-02-10T09:00:00Z'),
        description:
          'Le chauffage ne fonctionne pas dans la chambre. Températures très basses.',
        id: ae(9),
        lodgmentId: ff(21),
        residentId: bb(21),
        status: 'pending',
        type: 'hvac',
      },
      // --- Current 2025 - accepted ---
      {
        createdAt: new Date('2025-02-14T09:00:00Z'),
        description:
          'Disjoncteur déclenché dans la salle commune. Lumière clignotante dans la chambre.',
        id: ae(10),
        lodgmentId: ff(23),
        residentId: bb(23),
        startAt: new Date('2025-02-20T08:00:00Z'),
        status: 'accepted',
        type: 'electrical',
      },
      {
        createdAt: new Date('2025-02-25T09:00:00Z'),
        description:
          "Fuite d'eau sous l'évier de la kitchenette. Écoulement lent dans la douche.",
        id: ae(11),
        lodgmentId: ff(25),
        residentId: bb(25),
        startAt: new Date('2025-03-05T08:00:00Z'),
        status: 'accepted',
        type: 'plumbing',
      },
    ],
  });

  await prisma.maintenanceMaintainer.createMany({
    data: [
      // ae1 (done 2023): ab1, ab2
      {
        assignedAt: new Date('2023-03-10T08:00:00Z'),
        maintainerId: ab(1),
        maintenanceId: ae(1),
      },
      {
        assignedAt: new Date('2023-03-10T08:00:00Z'),
        maintainerId: ab(2),
        maintenanceId: ae(1),
      },
      // ae2 (done 2023): ab1, ab3
      {
        assignedAt: new Date('2023-04-05T08:00:00Z'),
        maintainerId: ab(1),
        maintenanceId: ae(2),
      },
      {
        assignedAt: new Date('2023-04-05T08:00:00Z'),
        maintainerId: ab(3),
        maintenanceId: ae(2),
      },
      // ae5 (done 2024): ab2
      {
        assignedAt: new Date('2024-02-15T08:00:00Z'),
        maintainerId: ab(2),
        maintenanceId: ae(5),
      },
      // ae6 (done 2024): ab1, ab2, ab4
      {
        assignedAt: new Date('2024-03-10T08:00:00Z'),
        maintainerId: ab(1),
        maintenanceId: ae(6),
      },
      {
        assignedAt: new Date('2024-03-10T08:00:00Z'),
        maintainerId: ab(2),
        maintenanceId: ae(6),
      },
      {
        assignedAt: new Date('2024-03-10T08:00:00Z'),
        maintainerId: ab(4),
        maintenanceId: ae(6),
      },
      // ae10 (accepted 2025): ab1
      {
        assignedAt: new Date('2025-02-20T08:00:00Z'),
        maintainerId: ab(1),
        maintenanceId: ae(10),
      },
      // ae11 (accepted 2025): ab2, ab4
      {
        assignedAt: new Date('2025-03-05T08:00:00Z'),
        maintainerId: ab(2),
        maintenanceId: ae(11),
      },
      {
        assignedAt: new Date('2025-03-05T08:00:00Z'),
        maintainerId: ab(4),
        maintenanceId: ae(11),
      },
    ],
  });

  await prisma.auditLog.createMany({
    data: [
      {
        action: 'maintenance.done',
        actorId: MAINT1,
        metadata: {
          newValue: { status: 'done' },
          oldValue: { status: 'accepted' },
        },
        targetId: ae(1),
        targetTable: 'maintenances',
      },
      {
        action: 'maintenance.done',
        actorId: MAINT1,
        metadata: {
          newValue: { status: 'done' },
          oldValue: { status: 'accepted' },
        },
        targetId: ae(2),
        targetTable: 'maintenances',
      },
      {
        action: 'maintenance.refused',
        actorId: MAINT2,
        metadata: {
          newValue: { status: 'refused' },
          oldValue: { status: 'pending' },
        },
        targetId: ae(3),
        targetTable: 'maintenances',
      },
      {
        action: 'maintenance.refused',
        actorId: MAINT1,
        metadata: {
          newValue: { status: 'refused' },
          oldValue: { status: 'pending' },
        },
        targetId: ae(4),
        targetTable: 'maintenances',
      },
      {
        action: 'maintenance.done',
        actorId: MAINT1,
        metadata: {
          newValue: { status: 'done' },
          oldValue: { status: 'accepted' },
        },
        targetId: ae(5),
        targetTable: 'maintenances',
      },
      {
        action: 'maintenance.done',
        actorId: MAINT2,
        metadata: {
          newValue: { status: 'done' },
          oldValue: { status: 'accepted' },
        },
        targetId: ae(6),
        targetTable: 'maintenances',
      },
      {
        action: 'maintenance.refused',
        actorId: MAINT1,
        metadata: {
          newValue: { status: 'refused' },
          oldValue: { status: 'pending' },
        },
        targetId: ae(7),
        targetTable: 'maintenances',
      },
      {
        action: 'maintenance.refused',
        actorId: MAINT2,
        metadata: {
          newValue: { status: 'refused' },
          oldValue: { status: 'pending' },
        },
        targetId: ae(8),
        targetTable: 'maintenances',
      },
      {
        action: 'maintenance.accepted',
        actorId: MAINT1,
        metadata: {
          newValue: { status: 'accepted' },
          oldValue: { status: 'pending' },
        },
        targetId: ae(10),
        targetTable: 'maintenances',
      },
      {
        action: 'maintenance.accepted',
        actorId: MAINT2,
        metadata: {
          newValue: { status: 'accepted' },
          oldValue: { status: 'pending' },
        },
        targetId: ae(11),
        targetTable: 'maintenances',
      },
    ],
  });
};
