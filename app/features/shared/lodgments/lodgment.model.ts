export const LodgmentStatuses = ['available', 'maintenance'] as const;

export const LodgmentStatus = createEnumConstants(LodgmentStatuses);

export type LodgmentStatus =
  (typeof LodgmentStatus)[keyof typeof LodgmentStatus];

export const LodgmentStatusLabel: Record<LodgmentStatus, string> = {
  [LodgmentStatus.available]: 'Available',
  [LodgmentStatus.maintenance]: 'Maintenance',
};

import type { SortOrder } from '#imports';

export type Lodgment = {
  building: Tables<'buildings'>;
  status: LodgmentStatus;
} & Omit<Tables<'lodgments'>, 'status'>;

export interface LodgmentFilters {
  building_id?: string;
  floor?: number;
  limit?: number;
  orderBy?: LodgmentOrderBy;
  page?: number;
  sortOrder?: SortOrder;
  status?: LodgmentStatus;
}

export type LodgmentInsert = TablesInsert<'lodgments'>;
export type LodgmentOrderBy = 'created_at' | 'floor' | 'room_number';
export type LodgmentUpdate = TablesUpdate<'lodgments'>;
