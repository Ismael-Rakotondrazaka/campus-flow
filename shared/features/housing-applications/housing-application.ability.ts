import type { User } from '#auth-utils';

import { UserTypeGuard } from '../../utils/userTypeGuard';
import { AdminRole } from '../admins/admin.model';

export const IndexHousingApplicationAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.housing_application)
);

export const ShowHousingApplicationAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.housing_application)
);

export const StoreHousingApplicationAbility = defineAbility(
  { allowGuest: true },
  (
    _user: null | User,
    session: { applicationCloseAt: Date; applicationOpenAt: Date }
  ) => {
    const now = new Date();
    return (
      now >= session.applicationOpenAt && now <= session.applicationCloseAt
    );
  }
);

export const UpdateHousingApplicationAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.housing_application)
);

export const DestroyHousingApplicationAbility = defineAbility((user: User) =>
  UserTypeGuard.hasAdminRole(user, AdminRole.housing_application)
);
