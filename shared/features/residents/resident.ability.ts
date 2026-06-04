import type { User } from '#auth-utils';

import { UserTypeGuard } from '../../utils/userTypeGuard';
import { AdminRole } from '../admins/admin.model';

export const IndexResidentAbility = defineAbility((user: User) =>
  UserTypeGuard.isAdmin(user)
);

export const ShowResidentAbility = defineAbility(
  (user: User, resident: { id: string }) =>
    UserTypeGuard.isAdmin(user) ||
    (UserTypeGuard.isResident(user) && user.id === resident.id)
);

export const UpdateResidentAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.renewal)
);

export const DestroyResidentAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.root)
);
