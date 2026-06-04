import type { User } from '#auth-utils';

export const IndexLodgmentAbility = defineAbility((_user: User) => true);

export const ShowLodgmentAbility = defineAbility((_user: User) => true);
