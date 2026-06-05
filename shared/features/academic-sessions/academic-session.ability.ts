import type { User } from '#auth-utils';

import { UserTypeGuard } from '../../utils/userTypeGuard';
import { AdminRole } from '../admins/admin.model';

export const IndexAcademicSessionAbility = defineAbility(
  { allowGuest: true },
  (_user: null | User) => true
);

export const ShowAcademicSessionAbility = defineAbility(
  { allowGuest: true },
  (_user: null | User) => true
);

export const StoreAcademicSessionAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.root)
);

export const UpdateAcademicSessionAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.root)
);

export const DestroyAcademicSessionAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.root)
);
