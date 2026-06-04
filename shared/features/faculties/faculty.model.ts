import type { Faculty } from '../../../prisma/generated/client/browser';

import { createEnumConstants } from '../../utils/enums';

export type { Faculty };

export const FacultyOrderBys = ['createdAt', 'name'] as const;
export const FacultyOrderBy = createEnumConstants(FacultyOrderBys);
export type FacultyOrderBy =
  (typeof FacultyOrderBy)[keyof typeof FacultyOrderBy];
