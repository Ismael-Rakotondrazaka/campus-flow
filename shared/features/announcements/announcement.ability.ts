import type { User } from '#auth-utils';

import { UserTypeGuard } from '../../utils/userTypeGuard';
import { AdminRole } from '../admins/admin.model';

export const IndexAnnouncementAbility = defineAbility(
  { allowGuest: true },
  (_user: null | User) => true
);

export const ShowAnnouncementAbility = defineAbility(
  { allowGuest: true },
  (_user: null | User) => true
);

export const StoreAnnouncementAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.root)
);

export const UpdateAnnouncementAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.root)
);

export const DestroyAnnouncementAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.root)
);
