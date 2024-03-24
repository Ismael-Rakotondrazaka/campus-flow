import { prismaCtx } from "#imports";

export default defineEventHandler(
  async (): Promise<StoreAnnouncementResponse> => {
    try {
      const adminSession: AdminSession | null = getAdminSession();
      if (is.null(adminSession)) {
        return createUnauthorizedError();
      }

      const storeAnnouncementBodySPR = await safeParseRequestBodyAs(
        StoreAnnouncementBodySchema,
      );
      if (!storeAnnouncementBodySPR.success) {
        return createBadRequestError({
          errorMessage: formatValidationErrorMessage(
            storeAnnouncementBodySPR.error,
          ),
        });
      }

      /*
       * if endAt exist, startAt must exist and less than or equal to endAt
       */
      if (is.date(storeAnnouncementBodySPR.data.endAt)) {
        if (!is.date(storeAnnouncementBodySPR.data.startAt)) {
          return createBadRequestError({
            errorMessage: {
              startAt:
                "Une annonce avec une date de fin doit avoir une date de début.",
            },
          });
        } else if (
          storeAnnouncementBodySPR.data.endAt.getTime() <
          storeAnnouncementBodySPR.data.startAt.getTime()
        ) {
          return createBadRequestError({
            errorMessage: {
              endAt: "La date de fin doit être après la date de début.",
            },
          });
        }
      }

      let illustrationUrl: string | undefined;
      if (
        !is.undefined(storeAnnouncementBodySPR.data.illustration) &&
        !is.null(storeAnnouncementBodySPR.data.illustration)
      ) {
        illustrationUrl = uploadAnnouncementIllustration(
          storeAnnouncementBodySPR.data.illustration,
        );
      }

      const now: Date = new Date();

      const announcement: prismaCtx.Announcement =
        await announcementRepository.createFullOne({
          data: {
            title: storeAnnouncementBodySPR.data.title,
            content: storeAnnouncementBodySPR.data.content,
            status: storeAnnouncementBodySPR.data.status,
            illustrationUrl,
            startAt: storeAnnouncementBodySPR.data.startAt,
            endAt: storeAnnouncementBodySPR.data.endAt,
            createdAt: now,
            updatedAt: now,
          },
        });

      const response: StoreAnnouncementResponse = {
        announcement,
      };

      return StoreAnnouncementDataSchema.parse(response);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
