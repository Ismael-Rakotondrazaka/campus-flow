import type { AdminModel } from '../../../prisma/generated/client/models';

import { createEnumConstants } from '../../utils/enums';

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

export const AdminRoleColor: Record<AdminRole, string> = {
  [AdminRole.housing_application]: 'bg-purple-500 text-white',
  [AdminRole.maintenance]: 'bg-orange-500 text-white',
  [AdminRole.renewal]: 'bg-blue-500 text-white',
  [AdminRole.root]: 'bg-red-500 text-white',
};

export type Admin = { role: AdminRole } & Omit<AdminModel, 'role'>;

export const AdminOrderBys = ['createdAt'] as const;
export const AdminOrderBy = createEnumConstants(AdminOrderBys);
export type AdminOrderBy = (typeof AdminOrderBy)[keyof typeof AdminOrderBy];
