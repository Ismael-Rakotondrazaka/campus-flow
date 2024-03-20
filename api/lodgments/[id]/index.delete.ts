export default defineEventHandler(
  async (): Promise<DestroyLodgmentResponse> => {
    try {
      const destroyLodgmentParamSPR = await safeParseRequestParamAs(
        DestroyLodgmentParamSchema,
      );
      if (!destroyLodgmentParamSPR.success) {
        return createNotFoundError();
      }

      const lodgment: LodgmentFull = await lodgmentRepository.findFullOneOrFail(
        {
          where: {
            id: destroyLodgmentParamSPR.data.id,
            deletedAt: null,
          },
        },
      );

      const adminSession: AdminSession | null = getAdminSession();
      if (is.null(adminSession)) {
        return createUnauthorizedError();
      }

      if (lodgment._count.students > 0) {
        return createBadRequestError({
          errorMessage: {
            lodgment:
              "Le logement est encore occupé. Transférez les résidents avant de supprimer le logement.",
          },
        });
      }

      const deletedLodgment: LodgmentFull =
        await lodgmentRepository.updateFullOne({
          where: {
            id: destroyLodgmentParamSPR.data.id,
          },
          data: {
            deletedAt: new Date(),
          },
        });

      const response: DestroyLodgmentResponse = {
        lodgment: deletedLodgment,
      };

      return DestroyLodgmentDataSchema.parse(response);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
