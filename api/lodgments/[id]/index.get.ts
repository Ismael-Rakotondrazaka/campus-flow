export default defineEventHandler(async (): Promise<ShowLodgmentResponse> => {
  try {
    const showLodgmentParamSPR = await safeParseRequestParamAs(
      ShowLodgmentParamSchema,
    );
    if (!showLodgmentParamSPR.success) {
      return createNotFoundError();
    }

    const lodgment: LodgmentFull = await lodgmentRepository.findFullOneOrFail({
      where: {
        id: showLodgmentParamSPR.data.id,
      },
    });

    const response: ShowLodgmentResponse = {
      lodgment,
    };

    return ShowLodgmentDataSchema.parse(response);
  } catch (error) {
    return handleUnknownError(error);
  }
});
