import type { AcademicSession } from '../../../prisma/generated/client/browser';

import { createEnumConstants } from '../../utils/enums';

export type { AcademicSession };

export const AcademicSessionOrderBys = ['createdAt', 'startAt'] as const;
export const AcademicSessionOrderBy = createEnumConstants(
  AcademicSessionOrderBys
);
export type AcademicSessionOrderBy =
  (typeof AcademicSessionOrderBy)[keyof typeof AcademicSessionOrderBy];
