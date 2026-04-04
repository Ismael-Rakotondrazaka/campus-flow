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
  [ReservationStatus.accepted]: 'Accepté',
  [ReservationStatus.pending]: 'En attente',
  [ReservationStatus.refused]: 'Refusé',
  [ReservationStatus.validated]: 'Validé',
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

export const Genders = ['male', 'female'] as const;

export const Gender = createEnumConstants(Genders);

export type Gender = (typeof Gender)[keyof typeof Gender];

export const GenderLabel: Record<Gender, string> = {
  [Gender.female]: 'Femme',
  [Gender.male]: 'Homme',
};

export const Origins = ['national', 'foreigner'] as const;

export const Origin = createEnumConstants(Origins);

export type Origin = (typeof Origin)[keyof typeof Origin];

export const OriginLabel: Record<Origin, string> = {
  [Origin.foreigner]: 'Étranger',
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
