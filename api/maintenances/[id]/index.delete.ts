export default defineEventHandler(
  async (_event): Promise<DestroyMaintenanceResponse> => {
    try {
      const destroyMaintenanceParamSPR = await safeParseRequestParamAs(
        DestroyMaintenanceParamSchema,
      );
      if (!destroyMaintenanceParamSPR.success) {
        return createNotFoundError();
      }

      const maintenance: MaintenanceFull =
        await maintenanceRepository.findFullOneOrFail({
          where: {
            id: destroyMaintenanceParamSPR.data.id,
          },
        });

      const studentSession: StudentSession | null = getStudentSession();
      if (is.null(studentSession)) {
        return createUnauthorizedError();
      }
      if (studentSession.id !== maintenance.studentId) {
        return createForbiddenError();
      }

      if (maintenance.status !== "PENDING") {
        return createForbiddenError({
          message:
            "La maintenance est déjà en cours de traitement et ne peux plus être annulée.",
          errorMessage: {},
        });
      }

      await maintenanceRepository.deleteOne({
        where: {
          id: destroyMaintenanceParamSPR.data.id,
        },
      });

      setResponseStatus(_event, 204);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
