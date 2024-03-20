import { z, prismaCtx } from "#imports";
import { Simplify } from "type-fest";
import {
  AnnouncementOrderByWithRelationInputSchema,
  AnnouncementSchema,
  AnnouncementWhereInputSchema,
} from "~/prisma/generated/zod";

/* -------------------------------------------------------------------------- */
/*                             IndexAnnouncement query                             */
/* -------------------------------------------------------------------------- */

export type IndexAnnouncementQuery = Simplify<
  {
    where?: prismaCtx.Prisma.AnnouncementWhereInput;
    orderBy?: prismaCtx.Prisma.AnnouncementOrderByWithRelationInput;
  } & PaginationQuery
>;

// ! we this type on client-side
export type IndexAnnouncementQueryInput = Partial<IndexAnnouncementQuery>;

export const IndexAnnouncementQuerySchema: z.ZodType<
  IndexAnnouncementQuery,
  z.ZodTypeDef,
  IndexAnnouncementQueryInput
> = z
  .object({
    where: AnnouncementWhereInputSchema,
    orderBy: AnnouncementOrderByWithRelationInputSchema,
  })
  .partial()
  .and(makePaginationQuery(announcementConfig.PAGE_SIZE_DEFAULT_VALUE));

/* -------------------------------------------------------------------------- */
/*                             IndexAnnouncement data                             */
/* -------------------------------------------------------------------------- */

export type IndexAnnouncementData = Simplify<
  {
    announcements: prismaCtx.Announcement[];
  } & Pagination
>;

export const IndexAnnouncementDataSchema: z.ZodType<IndexAnnouncementData> = z
  .object({
    announcements: z.array(AnnouncementSchema),
  })
  .and(PaginationSchema);

/* -------------------------------------------------------------------------- */
/*                             IndexAnnouncement error                            */
/* -------------------------------------------------------------------------- */

export type IndexAnnouncementQueryPEM =
  RequestErrorMessage<IndexAnnouncementQuery>;

export type IndexAnnouncementError = RequestError<IndexAnnouncementQueryPEM>;

export type IndexAnnouncementResponse = RequestResponse<
  IndexAnnouncementData,
  IndexAnnouncementQuery
>;
