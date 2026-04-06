import type { SortOrder } from '#imports';

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

export const RefusalReasons = [
  'capacity_limit_reached',
  'falsified_documents',
  'incomplete_documents',
  'ineligibility',
  'other',
  'past_behavior',
] as const;

export const RefusalReason = createEnumConstants(RefusalReasons);

export type RefusalReason = (typeof RefusalReason)[keyof typeof RefusalReason];

export const RefusalReasonLabel: Record<RefusalReason, string> = {
  [RefusalReason.capacity_limit_reached]: 'Limite de capacité atteinte',
  [RefusalReason.falsified_documents]: 'Documents falsifiés',
  [RefusalReason.incomplete_documents]: 'Documents incomplets',
  [RefusalReason.ineligibility]: 'Inéligibilité',
  [RefusalReason.other]: 'Autre',
  [RefusalReason.past_behavior]: 'Comportement antérieur',
};

export type Renewal = {
  academic_session: Tables<'academic_sessions'>;
  faculty: Tables<'faculties'>;
  refusal_reason: null | RefusalReason;
  resident: Tables<'residents'>;
  status: RenewalStatus;
} & Omit<Tables<'renewals'>, 'refusal_reason' | 'status'>;

export interface RenewalFilters {
  academic_session_id?: string;
  admin_id?: string;
  faculty_id?: string;
  include_deleted?: boolean;
  limit?: number;
  orderBy?: RenewalOrderBy;
  page?: number;
  resident_id?: string;
  sortOrder?: SortOrder;
  status?: RenewalStatus;
}

export type RenewalInsert = TablesInsert<'renewals'>;
export type RenewalOrderBy = 'created_at' | 'status';
export type RenewalUpdate = TablesUpdate<'renewals'>;
