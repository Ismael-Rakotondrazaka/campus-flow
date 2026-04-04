export const AdminRoles = [
  'root',
  'maintenance',
  'renewal',
  'reservation',
] as const;

export const AdminRole = createEnumConstants(AdminRoles);

export type AdminRole = (typeof AdminRole)[keyof typeof AdminRole];

export const AdminRoleLabel: Record<AdminRole, string> = {
  [AdminRole.maintenance]: 'Maintenance',
  [AdminRole.renewal]: 'Renouvellement',
  [AdminRole.reservation]: 'Réservation',
  [AdminRole.root]: 'Racine',
};

import type { SortOrder } from '#imports';

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
