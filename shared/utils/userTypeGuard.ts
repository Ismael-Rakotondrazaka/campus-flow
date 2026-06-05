import type { User } from '#auth-utils';

import type { AdminRole } from '../features/admins/admin.model';

export const UserTypeGuard = {
  hasAdminRole: (u: User, role: AdminRole): boolean =>
    u.role === role || u.role === 'root',
  isAdmin: (u: User): boolean => u.role !== 'resident',
  isResident: (u: User): boolean => u.role === 'resident',
};
