import { prismaCtx } from "#imports";

export default defineEventHandler(async (): Promise<StoreFacultyResponse> => {
  try {
    const adminSession: AdminSession | null = getAdminSession();
    if (is.null(adminSession)) {
      return createUnauthorizedError();
    }

    const storeFacultyBodySPR = await safeParseRequestBodyAs(
      StoreFacultyBodySchema,
    );
    if (!storeFacultyBodySPR.success) {
      return createBadRequestError({
        errorMessage: formatValidationErrorMessage(storeFacultyBodySPR.error),
      });
    }

    const faculty: prismaCtx.Faculty = await facultyRepository.createOne({
      data: {
        name: storeFacultyBodySPR.data.name,
      },
    });

    const response: StoreFacultyResponse = {
      faculty,
    };

    return StoreFacultyDataSchema.parse(response);
  } catch (error) {
    return handleUnknownError(error);
  }
});
