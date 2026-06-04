import type { User } from '#auth-utils';

import { UserTypeGuard } from '../../utils/userTypeGuard';
import { AdminRole } from '../admins/admin.model';

export const IndexRenewalAbility = defineAbility(
  (user: User) =>
    UserTypeGuard.hasAdminRole(user, AdminRole.renewal) ||
    UserTypeGuard.isResident(user)
);

export const ShowRenewalAbility = defineAbility(
  (user: User, renewal: { residentId: string }) =>
    UserTypeGuard.hasAdminRole(user, AdminRole.renewal) ||
    (UserTypeGuard.isResident(user) && user.id === renewal.residentId)
);

export const StoreRenewalAbility = defineAbility(
  (user: User, session: { renewalCloseAt: Date; renewalOpenAt: Date }) => {
    const now = new Date();
    return (
      UserTypeGuard.isResident(user) &&
      now >= session.renewalOpenAt &&
      now <= session.renewalCloseAt
    );
  }
);

export const UpdateRenewalAbility = defineAbility(
  (user: User, renewal: { residentId: string; status: string }) =>
    UserTypeGuard.hasAdminRole(user, AdminRole.renewal) ||
    (UserTypeGuard.isResident(user) &&
      user.id === renewal.residentId &&
      renewal.status === 'pending')
);

export const DestroyRenewalAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.renewal)
);
