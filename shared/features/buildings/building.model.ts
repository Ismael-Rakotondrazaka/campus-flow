import type { Building } from '../../../prisma/generated/client/browser';

import { createEnumConstants } from '../../utils/enums';

export type { Building };

export const BuildingOccupancyStatuses = [
  'available',
  'full',
  'overbooked',
] as const;

export const BuildingOccupancyStatus = createEnumConstants(
  BuildingOccupancyStatuses
);

export type BuildingOccupancyStatus =
  (typeof BuildingOccupancyStatus)[keyof typeof BuildingOccupancyStatus];

export const BuildingOccupancyStatusLabel: Record<
  BuildingOccupancyStatus,
  string
> = {
  [BuildingOccupancyStatus.available]: 'Disponible',
  [BuildingOccupancyStatus.full]: 'Complet',
  [BuildingOccupancyStatus.overbooked]: 'Surpeuplé',
};

export const BuildingOccupancyStatusColor: Record<
  BuildingOccupancyStatus,
  string
> = {
  [BuildingOccupancyStatus.available]: 'bg-green-500 text-white',
  [BuildingOccupancyStatus.full]: 'bg-yellow-500 text-white',
  [BuildingOccupancyStatus.overbooked]: 'bg-red-500 text-white',
};

export const getBuildingOccupancyStatus = (
  residentsCount: number,
  totalCapacity: number
): BuildingOccupancyStatus => {
  if (residentsCount < totalCapacity) return BuildingOccupancyStatus.available;
  if (residentsCount === totalCapacity) return BuildingOccupancyStatus.full;
  return BuildingOccupancyStatus.overbooked;
};

export const BuildingOrderBys = ['createdAt', 'name'] as const;
export const BuildingOrderBy = createEnumConstants(BuildingOrderBys);
export type BuildingOrderBy =
  (typeof BuildingOrderBy)[keyof typeof BuildingOrderBy];
