export default defineEventHandler(
  async (): Promise<StoreMaintenanceMaintainerResponse> => {
    try {
      const storeMaintenanceMaintainerParamSPR = await safeParseRequestParamAs(
        StoreMaintenanceMaintainerParamSchema,
      );
      if (!storeMaintenanceMaintainerParamSPR.success) {
        return createNotFoundError();
      }

      const maintenance: MaintenanceFull =
        await maintenanceRepository.findFullOneOrFail({
          where: {
            id: storeMaintenanceMaintainerParamSPR.data.id,
          },
        });

      const adminSession: AdminSession | null = getAdminSession();
      if (is.null(adminSession)) {
        return createUnauthorizedError();
      }

      if (
        !(adminSession.role === "MAINTENANCE" || adminSession.role === "ROOT")
      ) {
        return createForbiddenError();
      }

      if (adminSession.id !== maintenance.adminId) {
        return createForbiddenError();
      }

      const storeMaintenanceMaintainerBodySPR = await safeParseRequestBodyAs(
        StoreMaintenanceMaintainerBodySchema,
      );
      if (!storeMaintenanceMaintainerBodySPR.success) {
        return createBadRequestError({
          errorMessage: formatValidationErrorMessage(
            storeMaintenanceMaintainerBodySPR.error,
          ),
        });
      }

      const maintainer: MaintainerFull | null =
        await maintainerRepository.findFullOne({
          where: {
            id: storeMaintenanceMaintainerBodySPR.data.maintainerId,
          },
        });
      if (is.null(maintainer)) {
        return createBadRequestError({
          errorMessage: {
            buildingId: "L'agent de la maintenance n’existe pas.",
          },
        });
      }

      // if is already a maintainer
      if (maintenance.maintainers.some((value) => value.id === maintainer.id)) {
        const response: StoreMaintenanceMaintainerResponse = {
          maintainer,
        };

        return StoreMaintenanceMaintainerDataSchema.parse(response);
      } else {
        const connectedMaintainer: MaintainerFull =
          await maintainerRepository.updateFullOne({
            where: {
              id: maintainer.id,
            },
            data: {
              maintenances: {
                connect: {
                  id: maintenance.id,
                },
              },
            },
          });

        const response: StoreMaintenanceMaintainerResponse = {
          maintainer: connectedMaintainer,
        };

        return StoreMaintenanceMaintainerDataSchema.parse(response);
      }
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
