import { prismaCtx } from "#imports";

export default defineEventHandler(
  async (): Promise<DestroyAnnouncementResponse> => {
    try {
      const destroyAnnouncementParamSPR = await safeParseRequestParamAs(
        DestroyAnnouncementParamSchema,
      );
      if (!destroyAnnouncementParamSPR.success) {
        return createNotFoundError();
      }

      const announcement: prismaCtx.Announcement =
        await announcementRepository.findFullOneOrFail({
          where: {
            id: destroyAnnouncementParamSPR.data.id,
            deletedAt: null,
          },
        });

      const adminSession: AdminSession | null = getAdminSession();
      if (is.null(adminSession)) {
        return createUnauthorizedError();
      }

      const now: Date = new Date();

      const deletedAnnouncement: prismaCtx.Announcement =
        await announcementRepository.updateFullOne({
          where: {
            id: announcement.id,
          },
          data: {
            updatedAt: now,
            deletedAt: now,
          },
        });

      const response: DestroyAnnouncementResponse = {
        announcement: deletedAnnouncement,
      };

      return DestroyAnnouncementDataSchema.parse(response);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
