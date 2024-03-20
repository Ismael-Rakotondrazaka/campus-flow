export default defineEventHandler(async (): Promise<ShowAdminResponse> => {
  try {
    const showAdminParamSPR =
      await safeParseRequestParamAs(ShowAdminParamSchema);
    if (!showAdminParamSPR.success) {
      return createNotFoundError();
    }

    const admin: AdminFull = await adminRepository.findFullOneOrFail({
      where: {
        id: showAdminParamSPR.data.id,
      },
    });

    const response: ShowAdminResponse = {
      admin,
    };

    return ShowAdminDataSchema.parse(response);
  } catch (error) {
    return handleUnknownError(error);
  }
});
