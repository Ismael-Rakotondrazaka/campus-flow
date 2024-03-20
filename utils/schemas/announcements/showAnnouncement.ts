import { prismaCtx, z } from "#imports";
import { AnnouncementSchema } from "~/prisma/generated/zod";

/* -------------------------------------------------------------------------- */
/*                            ShowAnnouncement param                            */
/* -------------------------------------------------------------------------- */

export type ShowAnnouncementParam = {
  id: number;
};

export const ShowAnnouncementParamSchema: z.ZodType<ShowAnnouncementParam> =
  z.object({
    id: IdentifierSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             ShowAnnouncement data                             */
/* -------------------------------------------------------------------------- */

export type ShowAnnouncementData = {
  announcement: prismaCtx.Announcement;
};

export const ShowAnnouncementDataSchema: z.ZodType<ShowAnnouncementData> =
  z.object({
    announcement: AnnouncementSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             ShowAnnouncement error                            */
/* -------------------------------------------------------------------------- */

export type ShowAnnouncementBodyPEM = RequestErrorMessage<
  Record<string, never>
>;

export type ShowAnnouncementError = RequestError<ShowAnnouncementBodyPEM>;

export type ShowAnnouncementResponse = RequestResponse<
  ShowAnnouncementData,
  Record<string, never>
>;
