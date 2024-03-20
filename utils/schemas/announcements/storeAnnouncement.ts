import { prismaCtx, z } from "#imports";
import {
  AnnouncementSchema,
  AnnouncementStatusSchema,
} from "~/prisma/generated/zod";

/* -------------------------------------------------------------------------- */
/*                             StoreAnnouncement body                             */
/* -------------------------------------------------------------------------- */

export type StoreAnnouncementBody = {
  title: string;
  content: string;
  illustration?: File | null;
  status: prismaCtx.$Enums.AnnouncementStatus;
};

export type StoreAnnouncementBodyInput = {
  title: string;
  content: string;
  illustration?: File | null | string;
  status: prismaCtx.$Enums.AnnouncementStatus;
};

export const StoreAnnouncementBodySchema: z.ZodType<
  StoreAnnouncementBody,
  z.ZodTypeDef,
  StoreAnnouncementBodyInput
> = z.object({
  title: AnnouncementTitleSchema,
  content: AnnouncementContentSchema,
  illustration: z.union([CustomNullSchema, CustomUndefinedSchema, FileSchema]),
  status: AnnouncementStatusSchema,
});

/* -------------------------------------------------------------------------- */
/*                             StoreAnnouncement data                             */
/* -------------------------------------------------------------------------- */

export type StoreAnnouncementData = {
  announcement: prismaCtx.Announcement;
};
export const StoreAnnouncementDataSchema: z.ZodType<StoreAnnouncementData> =
  z.object({
    announcement: AnnouncementSchema,
  });
/* -------------------------------------------------------------------------- */
/*                             StoreAnnouncement error                            */
/* -------------------------------------------------------------------------- */

export type StoreAnnouncementBodyPEM =
  RequestErrorMessage<StoreAnnouncementBody>;

export type StoreAnnouncementError = RequestError<StoreAnnouncementBodyPEM>;

export type StoreAnnouncementResponse = RequestResponse<
  StoreAnnouncementData,
  StoreAnnouncementBody
>;
