export default defineEventHandler(
  async (): Promise<DestroyMaintainerResponse> => {
    try {
      const destroyMaintainerParamSPR = await safeParseRequestParamAs(
        DestroyMaintainerParamSchema,
      );
      if (!destroyMaintainerParamSPR.success) {
        return createNotFoundError();
      }

      const maintainer: MaintainerFull =
        await maintainerRepository.findFullOneOrFail({
          where: {
            id: destroyMaintainerParamSPR.data.id,
            deletedAt: null,
          },
        });

      const adminSession: AdminSession | null = getAdminSession();
      if (is.null(adminSession)) {
        return createUnauthorizedError();
      }

      if (maintainer._count.maintenances > 0) {
        return createBadRequestError({
          errorMessage: {
            maintainer:
              "Cet employé effectue encore des maintenances. Faites compléter ou transférer les maintenances avant de supprimer cet employé.",
          },
        });
      }

      const now = new Date();

      const deletedMaintainer: MaintainerFull =
        await maintainerRepository.updateFullOne({
          where: {
            id: destroyMaintainerParamSPR.data.id,
          },
          data: {
            deletedAt: now,
            updatedAt: now,
          },
        });

      const response: DestroyMaintainerResponse = {
        maintainer: deletedMaintainer,
      };

      return DestroyMaintainerDataSchema.parse(response);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
