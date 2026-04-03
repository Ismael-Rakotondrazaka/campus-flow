import type { SortOrder } from '#imports';

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
  [MaintenanceType.electrical]: 'Electrical',
  [MaintenanceType.equipment]: 'Equipment',
  [MaintenanceType.hvac]: 'HVAC',
  [MaintenanceType.other]: 'Other',
  [MaintenanceType.plumbing]: 'Plumbing',
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
  [MaintenanceStatus.accepted]: 'Accepted',
  [MaintenanceStatus.done]: 'Done',
  [MaintenanceStatus.pending]: 'Pending',
  [MaintenanceStatus.refused]: 'Refused',
};

export type Maintenance = {
  lodgment: Tables<'lodgments'>;
  maintainers: { assigned_at: string; maintainer: Tables<'maintainers'> }[];
  resident: Tables<'residents'>;
  status: MaintenanceStatus;
  type: MaintenanceType;
} & Omit<Tables<'maintenances'>, 'status' | 'type'>;

export interface MaintenanceFilters {
  admin_id?: string;
  limit?: number;
  lodgment_id?: string;
  orderBy?: MaintenanceOrderBy;
  page?: number;
  resident_id?: string;
  sortOrder?: SortOrder;
  status?: MaintenanceStatus;
  type?: MaintenanceType;
}

export type MaintenanceInsert = TablesInsert<'maintenances'>;
export type MaintenanceMaintainer = Tables<'maintenance_maintainers'>;
export type MaintenanceOrderBy = 'created_at' | 'status' | 'type';
export type MaintenanceUpdate = TablesUpdate<'maintenances'>;
