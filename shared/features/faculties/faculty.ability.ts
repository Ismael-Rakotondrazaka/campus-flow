import type { User } from '#auth-utils';

export const IndexFacultyAbility = defineAbility(
  { allowGuest: true },
  (_user: null | User) => true
);

export const ShowFacultyAbility = defineAbility(
  { allowGuest: true },
  (_user: null | User) => true
);
