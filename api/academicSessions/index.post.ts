import { prismaCtx } from "#imports";

export default defineEventHandler(
  async (): Promise<StoreAcademicSessionResponse> => {
    try {
      const adminSession: AdminSession | null = getAdminSession();
      if (is.null(adminSession)) {
        return createUnauthorizedError();
      }

      const storeAcademicSessionBodySPR = await safeParseRequestBodyAs(
        StoreAcademicSessionBodySchema,
      );
      if (!storeAcademicSessionBodySPR.success) {
        return createBadRequestError({
          errorMessage: formatValidationErrorMessage(
            storeAcademicSessionBodySPR.error,
          ),
        });
      }

      const formattedStartAt: Date = storeAcademicSessionBodySPR.data.startAt;
      formattedStartAt.setFullYear(formattedStartAt.getFullYear(), 0, 1);
      formattedStartAt.setHours(0, 0, 0, 0);

      const formattedEndAt: Date = storeAcademicSessionBodySPR.data.endAt;
      formattedEndAt.setFullYear(formattedEndAt.getFullYear(), 0, 1);
      formattedEndAt.setHours(0, 0, 0, 0);

      if (formattedStartAt.getFullYear() + 1 !== formattedEndAt.getFullYear()) {
        return createBadRequestError({
          errorMessage: {
            startAt:
              "L'interval de temps entre le début et la fin de l'année universitaire doit être de 1 an.",
            endAt:
              "L'interval de temps entre le début et la fin de l'année universitaire doit être de 1 an.",
          },
        });
      }

      const isAlreadyExist: boolean = await academicSessionRepository.exist({
        where: {
          startAt: formattedStartAt,
          deletedAt: null,
        },
      });
      if (isAlreadyExist) {
        return createBadRequestError({
          message: "L'année universitaire existe déjà.",
          errorMessage: {},
        });
      }

      const academicSession: prismaCtx.AcademicSession =
        await academicSessionRepository.createOne({
          data: {
            startAt: storeAcademicSessionBodySPR.data.startAt,
            endAt: storeAcademicSessionBodySPR.data.endAt,
          },
        });

      return {
        academicSession,
      };
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
