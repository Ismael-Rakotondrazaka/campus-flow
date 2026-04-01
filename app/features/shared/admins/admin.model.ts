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
  [AdminRole.renewal]: 'Renewal',
  [AdminRole.reservation]: 'Reservation',
  [AdminRole.root]: 'Root',
};

export type Admin = {
  user: Tables<'users'>;
} & Tables<'admins'>;

export interface AdminFilters {
  limit?: number;
  page?: number;
  role?: AdminRole;
}

export type AdminInsert = TablesInsert<'admins'>;
export type AdminUpdate = TablesUpdate<'admins'>;
