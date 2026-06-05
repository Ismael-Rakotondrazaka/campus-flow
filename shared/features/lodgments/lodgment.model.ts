import type {
  LodgmentGetPayload,
  LodgmentInclude,
} from '../../../prisma/generated/client/models';

import { createEnumConstants } from '../../utils/enums';

export const LodgementOccupancyStatuses = [
  'available',
  'full',
  'overbooked',
] as const;

export const LodgementOccupancyStatus = createEnumConstants(
  LodgementOccupancyStatuses
);

export type LodgementOccupancyStatus =
  (typeof LodgementOccupancyStatus)[keyof typeof LodgementOccupancyStatus];

export const LodgementOccupancyStatusLabel: Record<
  LodgementOccupancyStatus,
  string
> = {
  [LodgementOccupancyStatus.available]: 'Disponible',
  [LodgementOccupancyStatus.full]: 'Complet',
  [LodgementOccupancyStatus.overbooked]: 'Surpeuplé',
};

export const LodgementOccupancyStatusColor: Record<
  LodgementOccupancyStatus,
  string
> = {
  [LodgementOccupancyStatus.available]: 'bg-green-500 text-white',
  [LodgementOccupancyStatus.full]: 'bg-yellow-500 text-white',
  [LodgementOccupancyStatus.overbooked]: 'bg-red-500 text-white',
};

export const getLodgementOccupancyStatus = (
  residentsCount: number,
  capacity: number
): LodgementOccupancyStatus => {
  if (residentsCount < capacity) return LodgementOccupancyStatus.available;
  if (residentsCount === capacity) return LodgementOccupancyStatus.full;
  return LodgementOccupancyStatus.overbooked;
};

export const LodgmentOrderBys = [
  'buildingId',
  'createdAt',
  'floor',
  'roomNumber',
] as const;
export const LodgmentOrderBy = createEnumConstants(LodgmentOrderBys);
export const lodgmentInclude = {
  building: true,
} satisfies LodgmentInclude;

export type Lodgment = LodgmentGetPayload<{ include: typeof lodgmentInclude }>;

export type LodgmentOrderBy =
  (typeof LodgmentOrderBy)[keyof typeof LodgmentOrderBy];
