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
  [AdminRole.housing_application]: 'Demandes de Logement',
  [AdminRole.maintenance]: 'Maintenance',
  [AdminRole.renewal]: 'Renouvellement',
  [AdminRole.root]: 'Racine',
};

export type Admin = {
  user: Tables<'users'>;
} & Tables<'admins'>;

export interface AdminFilters {
  limit?: number;
  orderBy?: AdminOrderBy;
  page?: number;
  role?: AdminRole;
  sortOrder?: SortOrder;
}

export type AdminInsert = TablesInsert<'admins'>;
export type AdminOrderBy = 'created_at';
export type AdminUpdate = TablesUpdate<'admins'>;
