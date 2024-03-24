import { prismaCtx, z } from "#imports";
import {
  AnnouncementSchema,
  AnnouncementStatusSchema,
} from "~/prisma/generated/zod";

/* -------------------------------------------------------------------------- */
/*                            UpdateAnnouncement param                            */
/* -------------------------------------------------------------------------- */

export type UpdateAnnouncementParam = {
  id: number;
};

export const UpdateAnnouncementParamSchema: z.ZodType<UpdateAnnouncementParam> =
  z.object({
    id: IdentifierSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             UpdateAnnouncement body                             */
/* -------------------------------------------------------------------------- */

export type UpdateAnnouncementBody = Partial<{
  title: string;
  content: string;
  illustration?: File | null;
  status: prismaCtx.$Enums.AnnouncementStatus;
  startAt?: Date | null;
  endAt?: Date | null;
}>;

export type UpdateAnnouncementBodyInput = Partial<{
  title: string;
  content: string;
  illustration: File | null | string;
  status: prismaCtx.$Enums.AnnouncementStatus;
  startAt?: Date | null | string;
  endAt?: Date | null | string;
}>;

export const UpdateAnnouncementBodySchema: z.ZodType<
  UpdateAnnouncementBody,
  z.ZodTypeDef,
  UpdateAnnouncementBodyInput
> = z
  .object({
    title: AnnouncementTitleSchema,
    content: AnnouncementContentSchema,
    illustration: z.union([
      CustomNullSchema,
      CustomUndefinedSchema,
      FileSchema,
    ]),
    status: AnnouncementStatusSchema,
    startAt: z.union([
      CustomNullSchema,
      CustomUndefinedSchema,
      z.coerce.date(),
    ]),
    endAt: z.union([CustomNullSchema, CustomUndefinedSchema, z.coerce.date()]),
  })
  .partial();

/* -------------------------------------------------------------------------- */
/*                             UpdateAnnouncement data                             */
/* -------------------------------------------------------------------------- */

export type UpdateAnnouncementData = {
  announcement: prismaCtx.Announcement;
};
export const UpdateAnnouncementDataSchema: z.ZodType<UpdateAnnouncementData> =
  z.object({
    announcement: AnnouncementSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             UpdateAnnouncement error                            */
/* -------------------------------------------------------------------------- */

export type UpdateAnnouncementBodyPEM =
  RequestErrorMessage<UpdateAnnouncementBody>;

export type UpdateAnnouncementError = RequestError<UpdateAnnouncementBodyPEM>;

export type UpdateAnnouncementResponse = RequestResponse<
  UpdateAnnouncementData,
  UpdateAnnouncementBody
>;
