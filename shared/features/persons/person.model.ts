import { createEnumConstants } from '../../utils/enums';

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
