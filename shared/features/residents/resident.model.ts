import type {
  ResidentGetPayload,
  ResidentInclude,
} from '../../../prisma/generated/client/models';
import type { Gender, Origin } from '../persons/person.model';

import { createEnumConstants } from '../../utils/enums';

export const residentInclude = {
  academicSession: true,
  faculty: true,
  lodgment: { include: { building: true } },
} satisfies ResidentInclude;

export type Resident = {
  gender: Gender;
  origin: Origin;
} & Omit<
  ResidentGetPayload<{ include: typeof residentInclude }>,
  'gender' | 'origin'
>;

export const ResidentOrderBys = ['createdAt'] as const;
export const ResidentOrderBy = createEnumConstants(ResidentOrderBys);
export type ResidentOrderBy =
  (typeof ResidentOrderBy)[keyof typeof ResidentOrderBy];
