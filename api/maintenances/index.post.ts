import { prismaCtx } from "#imports";
import { LodgmentFull } from "~/utils/schemas";

export default defineEventHandler(
  async (): Promise<StoreMaintenanceResponse> => {
    try {
      const studentSession: StudentSession | null = getStudentSession();
      if (is.null(studentSession)) {
        return createUnauthorizedError();
      }

      const storeMaintenanceBodySPR = await safeParseRequestBodyAs(
        StoreMaintenanceBodySchema,
      );
      if (!storeMaintenanceBodySPR.success) {
        return createBadRequestError({
          errorMessage: formatValidationErrorMessage(
            storeMaintenanceBodySPR.error,
          ),
        });
      }

      const lodgment: LodgmentFull = await lodgmentRepository.findFullOneOrFail(
        {
          where: {
            students: {
              some: {
                user: {
                  id: studentSession.id,
                  deletedAt: null,
                },
              },
            },
          },
        },
      );

      const adminWithLowestMaintenances: prismaCtx.Admin | null =
        await adminRepository.findOne({
          where: {
            role: "MAINTENANCE",
            user: {
              deletedAt: null,
            },
          },
          orderBy: {
            maintenances: {
              _count: "asc",
            },
          },
          take: 1,
        });
      if (is.null(adminWithLowestMaintenances)) {
        throw createServerError({
          isPrivate: true,
          message:
            "Un étudiant essaie de signaler une maintenance, mais il y a aucun administrateur pour s'en occupé.",
        });
      }

      const maintenance: MaintenanceFull =
        await maintenanceRepository.createFullOne({
          data: {
            type: storeMaintenanceBodySPR.data.type,
            description: storeMaintenanceBodySPR.data.description,
            lodgmentId: lodgment.id,
            status: "PENDING",
            adminId: adminWithLowestMaintenances.userId,
          },
        });

      // TODO notify the assigned admin

      const response: StoreMaintenanceResponse = {
        maintenance,
      };

      return StoreMaintenanceDataSchema.parse(response);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
