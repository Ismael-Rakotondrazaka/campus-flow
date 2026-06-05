import type {
  RenewalGetPayload,
  RenewalInclude,
} from '../../../prisma/generated/client/models';
import type { RefusalReason } from '../refusals/refusal.model';

import { createEnumConstants } from '../../utils/enums';

export const RenewalStatuses = [
  'pending',
  'accepted',
  'refused',
  'validated',
] as const;

export const RenewalStatus = createEnumConstants(RenewalStatuses);

export type RenewalStatus = (typeof RenewalStatus)[keyof typeof RenewalStatus];

export const RenewalStatusLabel: Record<RenewalStatus, string> = {
  [RenewalStatus.accepted]: 'Accepté',
  [RenewalStatus.pending]: 'En attente',
  [RenewalStatus.refused]: 'Refusé',
  [RenewalStatus.validated]: 'Validé',
};

export const RenewalStatusColor: Record<RenewalStatus, string> = {
  [RenewalStatus.accepted]: 'bg-green-500 text-white',
  [RenewalStatus.pending]: 'bg-yellow-500 text-white',
  [RenewalStatus.refused]: 'bg-red-500 text-white',
  [RenewalStatus.validated]: 'bg-green-500 text-white',
};

export const renewalInclude = {
  academicSession: true,
  faculty: true,
  resident: { include: { user: true } },
} satisfies RenewalInclude;

export type Renewal = {
  refusalReason: null | RefusalReason;
  status: RenewalStatus;
} & Omit<
  RenewalGetPayload<{ include: typeof renewalInclude }>,
  'refusalReason' | 'status'
>;

export const RenewalOrderBys = ['createdAt', 'status'] as const;
export const RenewalOrderBy = createEnumConstants(RenewalOrderBys);
export type RenewalOrderBy =
  (typeof RenewalOrderBy)[keyof typeof RenewalOrderBy];
