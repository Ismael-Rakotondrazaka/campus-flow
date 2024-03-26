export default defineEventHandler(
  async (): Promise<DestroyBuildingResponse> => {
    try {
      const destroyBuildingParamSPR = await safeParseRequestParamAs(
        DestroyBuildingParamSchema,
      );
      if (!destroyBuildingParamSPR.success) {
        return createNotFoundError();
      }

      const building: BuildingFull = await buildingRepository.findFullOneOrFail(
        {
          where: {
            id: destroyBuildingParamSPR.data.id,
          },
        },
      );

      if (building._count.students > 0) {
        return createBadRequestError({
          message:
            "Le bâtiment possède encore des résidents. Transférez-les d'abord avant de supprimer ce bâtiment.",
          errorMessage: {},
        });
      }

      const now = new Date();

      const deletedBuilding: BuildingFull =
        await buildingRepository.updateFullOne({
          where: {
            id: building.id,
          },
          data: {
            deletedAt: now,
            updatedAt: now,
          },
        });

      const response: DestroyBuildingResponse = {
        building: deletedBuilding,
      };

      return DestroyBuildingDataSchema.parse(response);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
