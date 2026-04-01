export const RenewalStatuses = [
  'pending',
  'accepted',
  'refused',
  'validated',
] as const;

export const RenewalStatus = createEnumConstants(RenewalStatuses);

export type RenewalStatus = (typeof RenewalStatus)[keyof typeof RenewalStatus];

export const RenewalStatusLabel: Record<RenewalStatus, string> = {
  [RenewalStatus.accepted]: 'Accepted',
  [RenewalStatus.pending]: 'Pending',
  [RenewalStatus.refused]: 'Refused',
  [RenewalStatus.validated]: 'Validated',
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
  [RefusalReason.capacity_limit_reached]: 'Capacity Limit Reached',
  [RefusalReason.falsified_documents]: 'Falsified Documents',
  [RefusalReason.incomplete_documents]: 'Incomplete Documents',
  [RefusalReason.ineligibility]: 'Ineligibility',
  [RefusalReason.other]: 'Other',
  [RefusalReason.past_behavior]: 'Past Behavior',
};

export type Renewal = {
  academic_session: Tables<'academic_sessions'>;
  faculty: Tables<'faculties'>;
  refusal_reason: null | RefusalReason;
  status: RenewalStatus;
  student: Tables<'students'>;
} & Omit<Tables<'renewals'>, 'refusal_reason' | 'status'>;

export interface RenewalFilters {
  academic_session_id?: string;
  admin_id?: string;
  faculty_id?: string;
  limit?: number;
  page?: number;
  status?: RenewalStatus;
  student_id?: string;
}

export type RenewalInsert = TablesInsert<'renewals'>;
export type RenewalUpdate = TablesUpdate<'renewals'>;
