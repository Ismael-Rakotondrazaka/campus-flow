import type { Maintainer } from '../../../prisma/generated/client/browser';

import { createEnumConstants } from '../../utils/enums';

export type { Maintainer };

export const MaintainerOrderBys = [
  'createdAt',
  'firstName',
  'lastName',
] as const;
export const MaintainerOrderBy = createEnumConstants(MaintainerOrderBys);
export type MaintainerOrderBy =
  (typeof MaintainerOrderBy)[keyof typeof MaintainerOrderBy];
