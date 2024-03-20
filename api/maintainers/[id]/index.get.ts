export default defineEventHandler(async (): Promise<ShowMaintainerResponse> => {
  try {
    const showMaintainerParamSPR = await safeParseRequestParamAs(
      ShowMaintainerParamSchema,
    );
    if (!showMaintainerParamSPR.success) {
      return createNotFoundError();
    }

    const maintainer: MaintainerFull =
      await maintainerRepository.findFullOneOrFail({
        where: {
          id: showMaintainerParamSPR.data.id,
        },
      });

    const response: ShowMaintainerResponse = {
      maintainer,
    };

    return ShowMaintainerDataSchema.parse(response);
  } catch (error) {
    return handleUnknownError(error);
  }
});
