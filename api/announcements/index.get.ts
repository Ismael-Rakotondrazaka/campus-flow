import { prismaCtx } from "#imports";

export default defineEventHandler(
  async (): Promise<IndexAnnouncementResponse> => {
    try {
      const indexAnnouncementQuerySPR = await safeParseRequestQueryAs(
        IndexAnnouncementQuerySchema,
      );
      if (!indexAnnouncementQuerySPR.success) {
        return createBadRequestError({
          errorMessage: formatValidationErrorMessage(
            indexAnnouncementQuerySPR.error,
          ),
        });
      }

      const totalCounts: number = await announcementRepository.count({
        where: indexAnnouncementQuerySPR.data.where,
        orderBy: indexAnnouncementQuerySPR.data.orderBy,
      });

      const pageSize: number = indexAnnouncementQuerySPR.data.pageSize;

      const totalPages: number = Math.ceil(
        totalCounts / indexAnnouncementQuerySPR.data.pageSize,
      );

      const currentPage: number = indexAnnouncementQuerySPR.data.page;

      const links: PaginationLinks = makePaginationLinks(
        currentPage,
        totalPages,
        pageSize,
      );

      const announcements: prismaCtx.Announcement[] =
        await announcementRepository.findFullMany({
          where: indexAnnouncementQuerySPR.data.where,
          orderBy: indexAnnouncementQuerySPR.data.orderBy,
          take: pageSize,
          skip: computePaginationSkip(currentPage, pageSize),
        });

      const response: IndexAnnouncementResponse = {
        count: announcements.length,
        totalCounts,
        page: currentPage,
        pageSize,
        totalPages,
        links,
        announcements,
      };

      return IndexAnnouncementDataSchema.parse(response);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
