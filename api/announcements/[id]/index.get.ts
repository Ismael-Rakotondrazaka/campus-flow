import { prismaCtx } from "#imports";

export default defineEventHandler(
  async (): Promise<ShowAnnouncementResponse> => {
    try {
      const showAnnouncementParamSPR = await safeParseRequestParamAs(
        ShowAnnouncementParamSchema,
      );
      if (!showAnnouncementParamSPR.success) {
        return createNotFoundError();
      }

      const announcement: prismaCtx.Announcement =
        await announcementRepository.findFullOneOrFail({
          where: {
            id: showAnnouncementParamSPR.data.id,
          },
        });

      const response: ShowAnnouncementResponse = {
        announcement,
      };

      return ShowAnnouncementDataSchema.parse(response);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
