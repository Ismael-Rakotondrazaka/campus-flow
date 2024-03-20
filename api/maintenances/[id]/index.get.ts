export default defineEventHandler(
  async (): Promise<ShowMaintenanceResponse> => {
    try {
      const showMaintenanceParamSPR = await safeParseRequestParamAs(
        ShowMaintenanceParamSchema,
      );
      if (!showMaintenanceParamSPR.success) {
        return createNotFoundError();
      }

      const maintenance: MaintenanceFull =
        await maintenanceRepository.findFullOneOrFail({
          where: {
            id: showMaintenanceParamSPR.data.id,
          },
        });

      const response: ShowMaintenanceResponse = {
        maintenance,
      };

      return ShowMaintenanceDataSchema.parse(response);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
