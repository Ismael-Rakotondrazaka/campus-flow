import { prismaCtx, z } from "#imports";
import { AnnouncementSchema } from "~/prisma/generated/zod";

/* -------------------------------------------------------------------------- */
/*                            DestroyAnnouncement param                            */
/* -------------------------------------------------------------------------- */

export type DestroyAnnouncementParam = {
  id: number;
};

export const DestroyAnnouncementParamSchema: z.ZodType<DestroyAnnouncementParam> =
  z.object({
    id: IdentifierSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             DestroyAnnouncement data                             */
/* -------------------------------------------------------------------------- */

export type DestroyAnnouncementData = {
  announcement: prismaCtx.Announcement;
};

export const DestroyAnnouncementDataSchema: z.ZodType<DestroyAnnouncementData> =
  z.object({
    announcement: AnnouncementSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             DestroyAnnouncement error                            */
/* -------------------------------------------------------------------------- */

export type DestroyAnnouncementBodyPEM = RequestErrorMessage<
  Record<string, never>
>;

export type DestroyAnnouncementError = RequestError<DestroyAnnouncementBodyPEM>;

export type DestroyAnnouncementResponse = RequestResponse<
  DestroyAnnouncementData,
  Record<string, never>
>;
