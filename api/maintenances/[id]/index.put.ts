const handleAdminRequest = async (payload: {
  maintenance: MaintenanceFull;
  session: AdminSession;
  body: UpdateMaintenanceBodyAdmin;
}): Promise<UpdateMaintenanceResponse> => {
  if (
    !(
      !is.undefined(payload.body.status) &&
      payload.body.status !== payload.maintenance.status
    )
  ) {
    return createBadRequestError({
      message: "Au moins une modification est requise.",
      errorMessage: {},
    });
  }

  const now: Date = new Date();

  const updatedMaintenance: MaintenanceFull =
    await maintenanceRepository.updateFullOne({
      where: {
        id: payload.maintenance.id,
      },
      data: {
        status: payload.body.status,
        updatedAt: now,
        startAt: payload.body.startAt,
        endAt: payload.body.endAt,
      },
    });

  const response: UpdateMaintenanceData = {
    maintenance: updatedMaintenance,
  };

  return UpdateMaintenanceDataSchema.parse(response);
};

const handleStudentRequest = async (payload: {
  maintenance: MaintenanceFull;
  session: StudentSession;
  body: UpdateMaintenanceBodyStudent;
}): Promise<UpdateMaintenanceResponse> => {
  if (
    !(
      (!is.undefined(payload.body.description) &&
        payload.body.description !== payload.maintenance.description) ||
      (!is.undefined(payload.body.type) &&
        payload.body.type !== payload.maintenance.type)
    )
  ) {
    return createBadRequestError({
      message: "Au moins une modification est requise.",
      errorMessage: {},
    });
  }

  const now: Date = new Date();

  const updatedMaintenance: MaintenanceFull =
    await maintenanceRepository.updateFullOne({
      where: {
        id: payload.maintenance.id,
      },
      data: {
        description: payload.body.description,
        updatedAt: now,
        type: payload.body.type,
      },
    });

  const response: UpdateMaintenanceData = {
    maintenance: updatedMaintenance,
  };

  return UpdateMaintenanceDataSchema.parse(response);
};

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
      const studentSession: StudentSession | null = getStudentSession();

      if (is.null(adminSession) && is.null(studentSession)) {
        return createUnauthorizedError();
      } else {
        const updateMaintenanceBodySPR = await safeParseRequestBodyAs(
          UpdateMaintenanceBodySchema,
        );

        if (!is.null(adminSession)) {
          if (
            !(
              maintenance.adminId === adminSession.id ||
              adminSession.role === "ROOT"
            )
          ) {
            return createForbiddenError();
          }

          if (!updateMaintenanceBodySPR.success) {
            return createBadRequestError({
              errorMessage: formatValidationErrorMessage(
                updateMaintenanceBodySPR.error,
              ),
            });
          }

          return handleAdminRequest({
            maintenance,
            session: adminSession,
            body: {
              endAt: updateMaintenanceBodySPR.data.endAt,
              startAt: updateMaintenanceBodySPR.data.startAt,
              status: updateMaintenanceBodySPR.data.status,
            },
          });
        } else {
          if (maintenance.studentId !== studentSession!.id) {
            return createForbiddenError();
          }

          if (maintenance.status !== "PENDING") {
            return createBadRequestError({
              message:
                "La demande de maintenance est déjà en cours de traitement, et ne peut plus être modifiée.",
              errorMessage: {},
            });
          }

          if (!updateMaintenanceBodySPR.success) {
            return createBadRequestError({
              errorMessage: formatValidationErrorMessage(
                updateMaintenanceBodySPR.error,
              ),
            });
          }

          return await handleStudentRequest({
            maintenance,
            session: studentSession!,
            body: {
              description: updateMaintenanceBodySPR.data.description,
              type: updateMaintenanceBodySPR.data.type,
            },
          });
        }
      }
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
