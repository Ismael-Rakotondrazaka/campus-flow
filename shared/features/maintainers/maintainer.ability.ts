import type { User } from '#auth-utils';

import { UserTypeGuard } from '../../utils/userTypeGuard';
import { AdminRole } from '../admins/admin.model';

export const IndexMaintainerAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.maintenance)
);

export const ShowMaintainerAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.maintenance)
);

export const StoreMaintainerAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.maintenance)
);

export const UpdateMaintainerAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.maintenance)
);

export const DestroyMaintainerAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.maintenance)
);
