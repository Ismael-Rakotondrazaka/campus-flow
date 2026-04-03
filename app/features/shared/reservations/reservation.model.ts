import type { SortOrder } from '#imports';

export const ReservationStatuses = [
  'pending',
  'accepted',
  'refused',
  'validated',
] as const;

export const ReservationStatus = createEnumConstants(ReservationStatuses);

export type ReservationStatus =
  (typeof ReservationStatus)[keyof typeof ReservationStatus];

export const ReservationStatusLabel: Record<ReservationStatus, string> = {
  [ReservationStatus.accepted]: 'Accepted',
  [ReservationStatus.pending]: 'Pending',
  [ReservationStatus.refused]: 'Refused',
  [ReservationStatus.validated]: 'Validated',
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

export const Genders = ['male', 'female'] as const;

export const Gender = createEnumConstants(Genders);

export type Gender = (typeof Gender)[keyof typeof Gender];

export const GenderLabel: Record<Gender, string> = {
  [Gender.female]: 'Female',
  [Gender.male]: 'Male',
};

export const Origins = ['national', 'foreigner'] as const;

export const Origin = createEnumConstants(Origins);

export type Origin = (typeof Origin)[keyof typeof Origin];

export const OriginLabel: Record<Origin, string> = {
  [Origin.foreigner]: 'Foreigner',
  [Origin.national]: 'National',
};

export type Reservation = {
  academic_session: Tables<'academic_sessions'>;
  faculty: Tables<'faculties'>;
  lodgment: null | Tables<'lodgments'>;
  refusal_reason: null | RefusalReason;
  status: ReservationStatus;
} & Omit<Tables<'reservations'>, 'refusal_reason' | 'status'>;

export interface ReservationFilters {
  academic_session_id?: string;
  faculty_id?: string;
  gender?: Gender;
  limit?: number;
  orderBy?: ReservationOrderBy;
  origin?: Origin;
  page?: number;
  search?: string;
  sortOrder?: SortOrder;
  status?: ReservationStatus;
}

export type ReservationInsert = TablesInsert<'reservations'>;
export type ReservationOrderBy = 'created_at' | 'status';
export type ReservationUpdate = TablesUpdate<'reservations'>;
