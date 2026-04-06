import type { SortOrder } from '#imports';

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

export type HousingApplication = {
  academic_session: Tables<'academic_sessions'>;
  faculty: Tables<'faculties'>;
  lodgment: null | Tables<'lodgments'>;
  refusal_reason: null | RefusalReason;
  status: HousingApplicationStatus;
} & Omit<Tables<'housing_applications'>, 'refusal_reason' | 'status'>;

export interface HousingApplicationFilters {
  academic_session_id?: string;
  faculty_id?: string;
  gender?: Gender;
  include_deleted?: boolean;
  limit?: number;
  orderBy?: HousingApplicationOrderBy;
  origin?: Origin;
  page?: number;
  search?: string;
  sortOrder?: SortOrder;
  status?: HousingApplicationStatus;
}

export type HousingApplicationInsert = TablesInsert<'housing_applications'>;
export type HousingApplicationOrderBy = 'created_at' | 'status';
export type HousingApplicationUpdate = TablesUpdate<'housing_applications'>;
