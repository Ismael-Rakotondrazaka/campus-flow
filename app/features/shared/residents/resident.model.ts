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

export type Resident = {
  academic_session: Tables<'academic_sessions'>;
  faculty: Tables<'faculties'>;
  lodgment: Tables<'lodgments'>;
  user: Tables<'users'>;
} & Tables<'residents'>;

export interface ResidentFilters {
  academic_session_id?: string;
  faculty_id?: string;
  gender?: Gender;
  limit?: number;
  lodgment_id?: string;
  origin?: Origin;
  page?: number;
}

export type ResidentInsert = TablesInsert<'residents'>;
export type ResidentUpdate = TablesUpdate<'residents'>;
