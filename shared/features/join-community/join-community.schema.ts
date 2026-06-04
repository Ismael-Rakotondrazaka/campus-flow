import { GenderSchema, OriginSchema } from '#imports';
import { z } from 'zod';

import { PhoneNumberSchema } from '~/utils/phone-number';

export const JoinCommunitySchema = z.object({
  email: z.string().email(),
  emergencyNumber: PhoneNumberSchema,
  facultyId: z.string().uuid(),
  firstName: z.string().trim().min(1),
  gender: GenderSchema,
  imageUrl: z.any(),
  lastName: z.string().trim().min(1),
  nic: z.string().trim().min(1),
  nicUrl: z.any(),
  origin: OriginSchema,
  phoneNumber: PhoneNumberSchema,
  schoolCertificateUrl: z.any(),
});

export type JoinCommunity = z.infer<typeof JoinCommunitySchema>;
