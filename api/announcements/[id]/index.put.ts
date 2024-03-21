import { prismaCtx } from "#imports";

export default defineEventHandler(
  async (): Promise<UpdateAnnouncementResponse> => {
    try {
      const updateAnnouncementParamSPR = await safeParseRequestParamAs(
        UpdateAnnouncementParamSchema,
      );
      if (!updateAnnouncementParamSPR.success) {
        return createNotFoundError();
      }

      const announcement: prismaCtx.Announcement =
        await announcementRepository.findFullOneOrFail({
          where: {
            id: updateAnnouncementParamSPR.data.id,
            deletedAt: null,
          },
        });

      const adminSession: AdminSession | null = getAdminSession();
      if (is.null(adminSession)) {
        return createUnauthorizedError();
      }

      const updateAnnouncementBodySPR = await safeParseRequestBodyAs(
        UpdateAnnouncementBodySchema,
      );
      if (!updateAnnouncementBodySPR.success) {
        return createBadRequestError({
          errorMessage: formatValidationErrorMessage(
            updateAnnouncementBodySPR.error,
          ),
        });
      }

      if (
        !(
          (!is.undefined(updateAnnouncementBodySPR.data.content) &&
            updateAnnouncementBodySPR.data.content !== announcement.content) ||
          (!is.undefined(updateAnnouncementBodySPR.data.title) &&
            updateAnnouncementBodySPR.data.title !== announcement.title) ||
          (!is.undefined(updateAnnouncementBodySPR.data.status) &&
            updateAnnouncementBodySPR.data.status !== announcement.status) ||
          (!is.undefined(updateAnnouncementBodySPR.data.startAt) &&
            updateAnnouncementBodySPR.data.startAt !== announcement.startAt) ||
          (!is.undefined(updateAnnouncementBodySPR.data.endAt) &&
            updateAnnouncementBodySPR.data.endAt !== announcement.endAt) ||
          (!is.undefined(updateAnnouncementBodySPR.data.status) &&
            updateAnnouncementBodySPR.data.status !== announcement.status)
        )
      ) {
        return createBadRequestError({
          message: "Au moins une modification est requise.",
          errorMessage: {},
        });
      }

      /*
       * if endAt exist, startAt must exist and less than or equal to endAt
       */
      if (is.date(updateAnnouncementBodySPR.data.endAt)) {
        let newStartAt: Date | null = announcement.startAt;

        if (is.date(updateAnnouncementBodySPR.data.startAt)) {
          newStartAt = updateAnnouncementBodySPR.data.startAt;
        }

        if (!is.date(newStartAt)) {
          return createBadRequestError({
            errorMessage: {
              startAt:
                "Une annonce avec une date de fin doit avoir une date de début.",
            },
          });
        } else if (
          updateAnnouncementBodySPR.data.endAt.getTime() < newStartAt.getTime()
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
        !is.undefined(updateAnnouncementBodySPR.data.illustration) &&
        !is.null(updateAnnouncementBodySPR.data.illustration)
      ) {
        illustrationUrl = uploadAnnouncementIllustration(
          updateAnnouncementBodySPR.data.illustration,
        );
      }

      const updatedAnnouncement: prismaCtx.Announcement =
        await announcementRepository.updateFullOne({
          where: {
            id: announcement.id,
          },
          data: {
            content: updateAnnouncementBodySPR.data.content,
            status: updateAnnouncementBodySPR.data.status,
            title: updateAnnouncementBodySPR.data.title,
            illustrationUrl,
            updatedAt: new Date(),
          },
        });

      const response: UpdateAnnouncementResponse = {
        announcement: updatedAnnouncement,
      };

      return UpdateAnnouncementDataSchema.parse(response);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
