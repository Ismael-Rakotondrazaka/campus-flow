import { createEnumConstants } from '../../utils/enums';

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
