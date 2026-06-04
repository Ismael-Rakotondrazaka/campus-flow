import type { User } from '#auth-utils';

import { UserTypeGuard } from '../../utils/userTypeGuard';
import { AdminRole } from './admin.model';

export const IndexAdminAbility = defineAbility((user: User) =>
  UserTypeGuard.isAdmin(user)
);

export const ShowAdminAbility = defineAbility((user: User) =>
  UserTypeGuard.isAdmin(user)
);

export const UpdateAdminAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.root)
);

export const DestroyAdminAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.root)
);
