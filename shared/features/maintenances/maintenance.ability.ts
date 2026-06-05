import type { User } from '#auth-utils';

import { UserTypeGuard } from '../../utils/userTypeGuard';
import { AdminRole } from '../admins/admin.model';

export const IndexMaintenanceAbility = defineAbility(
  (user: User) =>
    UserTypeGuard.hasAdminRole(user, AdminRole.maintenance) ||
    UserTypeGuard.isResident(user)
);

export const ShowMaintenanceAbility = defineAbility(
  (user: User, maintenance: { residentId: string }) =>
    UserTypeGuard.hasAdminRole(user, AdminRole.maintenance) ||
    (UserTypeGuard.isResident(user) && user.id === maintenance.residentId)
);

export const StoreMaintenanceAbility = defineAbility((user: User) =>
  UserTypeGuard.isResident(user)
);

export const UpdateMaintenanceAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.maintenance)
);

export const DestroyMaintenanceAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.maintenance)
);

export const AssignMaintainerAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.maintenance)
);

export const UnassignMaintainerAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.maintenance)
);
