import { z } from 'zod';

import { ANNOUNCEMENT_ILLUSTRATIONS_BUCKET } from '../announcements/announcement.config';
import { HOUSING_APPLICATION_DOCUMENTS_BUCKET } from '../housing-applications/housing-application.config';
import { RENEWAL_DOCUMENTS_BUCKET } from '../renewals/renewal.config';
import { USER_PROFILES_BUCKET } from '../users/user.config';

export const PresignBodySchema = z.object({
  contentType: z.enum(['image/gif', 'image/jpeg', 'image/png', 'image/webp']),
  fileName: z.string().min(1).default('file'),
});

export type PresignBody = z.infer<typeof PresignBodySchema>;

export const PresignDocumentBodySchema = z.object({
  contentType: z.enum([
    'application/pdf',
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/webp',
  ]),
  fileName: z.string().min(1).default('document'),
});

export type PresignDocumentBody = z.infer<typeof PresignDocumentBodySchema>;

export const UserAvatarParamsSchema = z.object({
  userId: z.string().uuid(),
});

export type UserAvatarParams = z.infer<typeof UserAvatarParamsSchema>;

export const AnnouncementIllustrationParamsSchema = z.object({
  announcementId: z.string().uuid(),
});

export type AnnouncementIllustrationParams = z.infer<
  typeof AnnouncementIllustrationParamsSchema
>;

export const HousingApplicationDocumentParamsSchema = z.object({
  applicationId: z.string().uuid(),
  type: z.enum(['nic', 'photo', 'school-certificate']),
});

export type HousingApplicationDocumentParams = z.infer<
  typeof HousingApplicationDocumentParamsSchema
>;

export const RenewalDocumentParamsSchema = z.object({
  folderId: z.string().uuid(),
  type: z.enum(['nic', 'photo', 'school-certificate']),
});

export type RenewalDocumentParams = z.infer<typeof RenewalDocumentParamsSchema>;

export const SignedUrlQuerySchema = z.object({
  bucket: z.enum([
    ANNOUNCEMENT_ILLUSTRATIONS_BUCKET,
    HOUSING_APPLICATION_DOCUMENTS_BUCKET,
    RENEWAL_DOCUMENTS_BUCKET,
    USER_PROFILES_BUCKET,
  ]),
  path: z.string().min(1),
});

export type SignedUrlQuery = z.infer<typeof SignedUrlQuerySchema>;
