import type {
  HousingApplicationGetPayload,
  HousingApplicationInclude,
} from '../../../prisma/generated/client/models';
import type { Gender, Origin } from '../persons/person.model';
import type { RefusalReason } from '../refusals/refusal.model';

import { createEnumConstants } from '../../utils/enums';

export const HousingApplicationStatuses = [
  'pending',
  'accepted',
  'refused',
  'validated',
] as const;

export const HousingApplicationStatus = createEnumConstants(
  HousingApplicationStatuses
);

export type HousingApplicationStatus =
  (typeof HousingApplicationStatus)[keyof typeof HousingApplicationStatus];

export const HousingApplicationStatusLabel: Record<
  HousingApplicationStatus,
  string
> = {
  [HousingApplicationStatus.accepted]: 'Accepté',
  [HousingApplicationStatus.pending]: 'En attente',
  [HousingApplicationStatus.refused]: 'Refusé',
  [HousingApplicationStatus.validated]: 'Validé',
};

export const HousingApplicationStatusColor: Record<
  HousingApplicationStatus,
  string
> = {
  [HousingApplicationStatus.accepted]: 'bg-green-500 text-white',
  [HousingApplicationStatus.pending]: 'bg-yellow-500 text-white',
  [HousingApplicationStatus.refused]: 'bg-red-500 text-white',
  [HousingApplicationStatus.validated]: 'bg-green-500 text-white',
};

export const housingApplicationInclude = {
  academicSession: true,
  faculty: true,
  lodgment: { include: { building: true } },
} satisfies HousingApplicationInclude;

export type HousingApplication = {
  gender: Gender;
  origin: Origin;
  refusalReason: null | RefusalReason;
  status: HousingApplicationStatus;
} & Omit<
  HousingApplicationGetPayload<{ include: typeof housingApplicationInclude }>,
  'gender' | 'origin' | 'refusalReason' | 'status'
>;

export const HousingApplicationOrderBys = ['createdAt', 'status'] as const;
export const HousingApplicationOrderBy = createEnumConstants(
  HousingApplicationOrderBys
);
export type HousingApplicationOrderBy =
  (typeof HousingApplicationOrderBy)[keyof typeof HousingApplicationOrderBy];
