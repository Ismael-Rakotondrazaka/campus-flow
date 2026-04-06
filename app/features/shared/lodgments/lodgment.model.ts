import type { SortOrder } from '#imports';

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

export type Lodgment = {
  building: Tables<'buildings'>;
} & Tables<'lodgments'>;

export interface LodgmentFilters {
  building_id?: string;
  floor?: number;
  limit?: number;
  orderBy?: LodgmentOrderBy;
  page?: number;
  sortOrder?: SortOrder;
}

export type LodgmentInsert = TablesInsert<'lodgments'>;
export type LodgmentOrderBy =
  | 'building_id'
  | 'created_at'
  | 'floor'
  | 'room_number';
export type LodgmentUpdate = TablesUpdate<'lodgments'>;
