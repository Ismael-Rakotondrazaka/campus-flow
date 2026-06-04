import type { User } from '#auth-utils';

import { UserTypeGuard } from '../../utils/userTypeGuard';
import { AdminRole } from '../admins/admin.model';

export const IndexAnnouncementAbility = defineAbility(
  (user: User) => UserTypeGuard.isAdmin(user) || UserTypeGuard.isResident(user)
);

export const ShowAnnouncementAbility = defineAbility(
  (user: User) => UserTypeGuard.isAdmin(user) || UserTypeGuard.isResident(user)
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
