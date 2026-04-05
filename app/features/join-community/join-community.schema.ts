import { z } from 'zod';

import {
  GenderSchema,
  OriginSchema,
} from '~/features/shared/housing-applications/housing-application.schema';
import { PhoneNumberSchema } from '~/utils/phone-number';

export const JoinCommunitySchema = z.object({
  email: z.string().email('Invalide'),
  emergency_number: PhoneNumberSchema,
  faculty_id: z.string().uuid('Veuillez sélectionner une faculté'),
  first_name: z.string().trim().min(1, 'Obligatoire'),
  gender: GenderSchema,
  image_url: z.any(),
  last_name: z.string().trim().min(1, 'Obligatoire'),
  nic: z.string().trim().min(1, 'Obligatoire'),
  nic_url: z.any(),
  origin: OriginSchema,
  phone_number: PhoneNumberSchema,
  school_certificate_url: z.any(),
});

export type JoinCommunity = z.infer<typeof JoinCommunitySchema>;
