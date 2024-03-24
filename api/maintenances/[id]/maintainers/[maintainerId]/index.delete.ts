export default defineEventHandler(
  async (): Promise<DestroyMaintenanceMaintainerResponse> => {
    try {
      const destroyMaintenanceMaintainerParamSPR =
        await safeParseRequestParamAs(DestroyMaintenanceMaintainerParamSchema);
      if (!destroyMaintenanceMaintainerParamSPR.success) {
        return createNotFoundError();
      }

      const maintenance: MaintenanceFull =
        await maintenanceRepository.findFullOneOrFail({
          where: {
            id: destroyMaintenanceMaintainerParamSPR.data.id,
          },
        });

      const maintainer: MaintainerFull =
        await maintainerRepository.findFullOneOrFail({
          where: {
            id: destroyMaintenanceMaintainerParamSPR.data.maintainerId,
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

      if (
        !maintenance.maintainers.some((value) => value.id === maintainer.id)
      ) {
        const response: DestroyMaintenanceMaintainerResponse = {
          maintainer,
        };

        return DestroyMaintenanceMaintainerDataSchema.parse(response);
      } else {
        const disconnectedMaintainer: MaintainerFull =
          await maintainerRepository.updateFullOne({
            where: {
              id: maintainer.id,
            },
            data: {
              maintenances: {
                disconnect: {
                  id: maintenance.id,
                },
              },
            },
          });

        const response: DestroyMaintenanceMaintainerResponse = {
          maintainer: disconnectedMaintainer,
        };

        return DestroyMaintenanceMaintainerDataSchema.parse(response);
      }
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
