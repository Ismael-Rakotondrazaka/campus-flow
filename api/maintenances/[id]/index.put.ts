export default defineEventHandler(
  async (): Promise<UpdateMaintenanceResponse> => {
    try {
      const updateMaintenanceParamSPR = await safeParseRequestParamAs(
        UpdateMaintenanceParamSchema,
      );
      if (!updateMaintenanceParamSPR.success) {
        return createNotFoundError();
      }

      const maintenance: MaintenanceFull =
        await maintenanceRepository.findFullOneOrFail({
          where: {
            id: updateMaintenanceParamSPR.data.id,
          },
        });

      const adminSession: AdminSession | null = getAdminSession();
      if (is.null(adminSession)) {
        return createUnauthorizedError();
      }
      if (
        !(
          maintenance.adminId === adminSession.id ||
          adminSession.role === "ROOT"
        )
      ) {
        return createForbiddenError();
      }

      const updateMaintenanceBodySPR = await safeParseRequestBodyAs(
        UpdateMaintenanceBodySchema,
      );
      if (!updateMaintenanceBodySPR.success) {
        return createBadRequestError({
          errorMessage: formatValidationErrorMessage(
            updateMaintenanceBodySPR.error,
          ),
        });
      }

      if (
        !(
          !is.undefined(updateMaintenanceBodySPR.data.status) &&
          updateMaintenanceBodySPR.data.status !== maintenance.status
        )
      ) {
        return createBadRequestError({
          message: "Au moins une modification est requise.",
          errorMessage: {},
        });
      }

      const updatedMaintenance: MaintenanceFull =
        await maintenanceRepository.updateFullOne({
          where: {
            id: maintenance.id,
          },
          data: {
            status: updateMaintenanceBodySPR.data.status,
            updatedAt: new Date(),
          },
        });

      const response: UpdateMaintenanceResponse = {
        maintenance: updatedMaintenance,
      };

      return UpdateMaintenanceDataSchema.parse(response);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
