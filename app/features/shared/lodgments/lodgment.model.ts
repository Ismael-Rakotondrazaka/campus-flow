export const LodgmentStatuses = ['available', 'maintenance'] as const;

export const LodgmentStatus = createEnumConstants(LodgmentStatuses);

export type LodgmentStatus =
  (typeof LodgmentStatus)[keyof typeof LodgmentStatus];

export const LodgmentStatusLabel: Record<LodgmentStatus, string> = {
  [LodgmentStatus.available]: 'Available',
  [LodgmentStatus.maintenance]: 'Maintenance',
};

export type Lodgment = {
  building: Tables<'buildings'>;
  status: LodgmentStatus;
} & Omit<Tables<'lodgments'>, 'status'>;

export interface LodgmentFilters {
  building_id?: string;
  floor?: number;
  limit?: number;
  page?: number;
  status?: LodgmentStatus;
}

export type LodgmentInsert = TablesInsert<'lodgments'>;
export type LodgmentUpdate = TablesUpdate<'lodgments'>;
