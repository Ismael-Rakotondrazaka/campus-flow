import type {
  MaintenanceGetPayload,
  MaintenanceInclude,
} from '../../../prisma/generated/client/models';

import { createEnumConstants } from '../../utils/enums';

export const MaintenanceTypes = [
  'electrical',
  'equipment',
  'hvac',
  'other',
  'plumbing',
] as const;

export const MaintenanceType = createEnumConstants(MaintenanceTypes);

export type MaintenanceType =
  (typeof MaintenanceType)[keyof typeof MaintenanceType];

export const MaintenanceTypeLabel: Record<MaintenanceType, string> = {
  [MaintenanceType.electrical]: 'Électrique',
  [MaintenanceType.equipment]: 'Équipement',
  [MaintenanceType.hvac]: 'CVC',
  [MaintenanceType.other]: 'Autre',
  [MaintenanceType.plumbing]: 'Plomberie',
};

export const MaintenanceStatuses = [
  'accepted',
  'done',
  'pending',
  'refused',
] as const;

export const MaintenanceStatus = createEnumConstants(MaintenanceStatuses);

export type MaintenanceStatus =
  (typeof MaintenanceStatus)[keyof typeof MaintenanceStatus];

export const MaintenanceStatusLabel: Record<MaintenanceStatus, string> = {
  [MaintenanceStatus.accepted]: 'Accepté',
  [MaintenanceStatus.done]: 'Terminé',
  [MaintenanceStatus.pending]: 'En attente',
  [MaintenanceStatus.refused]: 'Refusé',
};

export const MaintenanceStatusColor: Record<MaintenanceStatus, string> = {
  [MaintenanceStatus.accepted]: 'bg-blue-500 text-white',
  [MaintenanceStatus.done]: 'bg-green-500 text-white',
  [MaintenanceStatus.pending]: 'bg-yellow-500 text-white',
  [MaintenanceStatus.refused]: 'bg-red-500 text-white',
};

export const maintenanceInclude = {
  lodgment: { include: { building: true } },
  maintenanceMaintainers: { include: { maintainer: true } },
  resident: true,
} satisfies MaintenanceInclude;

export type Maintenance = {
  status: MaintenanceStatus;
  type: MaintenanceType;
} & Omit<
  MaintenanceGetPayload<{ include: typeof maintenanceInclude }>,
  'status' | 'type'
>;

export const MAINTENANCE_TRANSITIONS: Record<
  MaintenanceStatus,
  MaintenanceStatus[]
> = {
  [MaintenanceStatus.accepted]: [MaintenanceStatus.done],
  [MaintenanceStatus.done]: [],
  [MaintenanceStatus.pending]: [
    MaintenanceStatus.accepted,
    MaintenanceStatus.refused,
  ],
  [MaintenanceStatus.refused]: [],
};

export const MaintenanceOrderBys = ['createdAt', 'status', 'type'] as const;
export const MaintenanceOrderBy = createEnumConstants(MaintenanceOrderBys);
export type MaintenanceOrderBy =
  (typeof MaintenanceOrderBy)[keyof typeof MaintenanceOrderBy];
