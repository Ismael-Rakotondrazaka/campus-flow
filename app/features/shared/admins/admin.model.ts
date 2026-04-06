import type { SortOrder } from '#imports';

export const AdminRoles = [
  'root',
  'maintenance',
  'renewal',
  'housing_application',
] as const;

export const AdminRole = createEnumConstants(AdminRoles);

export type AdminRole = (typeof AdminRole)[keyof typeof AdminRole];

export const AdminRoleLabel: Record<AdminRole, string> = {
  [AdminRole.housing_application]: 'Responsable de demandes de logement',
  [AdminRole.maintenance]: 'Responsable de maintenance',
  [AdminRole.renewal]: 'Responsable de renouvellement',
  [AdminRole.root]: 'Administrateur technique',
};

export type Admin = Tables<'admins'>;

export interface AdminFilters {
  include_deleted?: boolean;
  limit?: number;
  orderBy?: AdminOrderBy;
  page?: number;
  role?: AdminRole;
  sortOrder?: SortOrder;
}

export type AdminInsert = TablesInsert<'admins'>;
export type AdminOrderBy = 'created_at';
export type AdminUpdate = TablesUpdate<'admins'>;
