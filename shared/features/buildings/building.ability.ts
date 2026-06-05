import type { User } from '#auth-utils';

export const IndexBuildingAbility = defineAbility((_user: User) => true);

export const ShowBuildingAbility = defineAbility((_user: User) => true);
