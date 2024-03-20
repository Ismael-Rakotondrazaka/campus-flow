export default defineEventHandler(async (): Promise<ShowRenewalResponse> => {
  try {
    const showRenewalParamSPR = await safeParseRequestParamAs(
      ShowRenewalParamSchema,
    );
    if (!showRenewalParamSPR.success) {
      return createNotFoundError();
    }

    const renewal: RenewalFull = await renewalRepository.findFullOneOrFail({
      where: {
        id: showRenewalParamSPR.data.id,
      },
    });

    const response: ShowRenewalResponse = {
      renewal,
    };

    return ShowRenewalDataSchema.parse(response);
  } catch (error) {
    return handleUnknownError(error);
  }
});
