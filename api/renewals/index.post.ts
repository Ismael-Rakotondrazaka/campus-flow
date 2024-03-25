import { prismaCtx } from "#imports";
import { StoreRenewalBodyPEM } from "~/utils/schemas";

export default defineEventHandler(
  async (_event): Promise<StoreRenewalResponse> => {
    try {
      const studentSession: StudentSession | null = getStudentSession();
      if (is.null(studentSession)) {
        return createUnauthorizedError();
      }

      const storeRenewalBodySPR = await safeParseRequestBodyAs(
        StoreRenewalBodySchema,
      );
      if (!storeRenewalBodySPR.success) {
        return createBadRequestError({
          errorMessage: formatValidationErrorMessage(storeRenewalBodySPR.error),
        });
      }

      let haveLogicalErrors: boolean = false;
      const logicalErrorMessage: StoreRenewalBodyPEM = {};

      const isAcademicSessionExist: boolean =
        await academicSessionRepository.exist({
          where: {
            id: storeRenewalBodySPR.data.academicSessionId,
          },
        });
      if (!isAcademicSessionExist) {
        haveLogicalErrors = true;
        logicalErrorMessage.academicSessionId =
          "L'année universitaire n’existe pas.";
      }

      const isFacultyExist: boolean = await facultyRepository.exist({
        where: {
          id: storeRenewalBodySPR.data.facultyId,
        },
      });
      if (!isFacultyExist) {
        haveLogicalErrors = true;
        logicalErrorMessage.facultyId = "La faculté n’existe pas.";
      }

      const isRenewalAlreadyExist: boolean = await renewalRepository.exist({
        where: {
          studentId: studentSession.id,
          academicSessionId: storeRenewalBodySPR.data.academicSessionId,
        },
      });
      if (isRenewalAlreadyExist) {
        haveLogicalErrors = true;
        logicalErrorMessage.academicSessionId =
          "Vous avez déjà soumis un renouvellement pour l'année universitaire.";
      }

      if (haveLogicalErrors) {
        return createBadRequestError({
          errorMessage: logicalErrorMessage,
        });
      }

      const adminWithLowestRenewals: prismaCtx.Admin | null =
        await adminRepository.findOne({
          where: {
            role: "RENEWAL",
            user: {
              deletedAt: null,
            },
          },
          orderBy: {
            renewals: {
              _count: "asc",
            },
          },
          take: 1,
        });
      if (is.null(adminWithLowestRenewals)) {
        throw createServerError({
          isPrivate: true,
          message:
            "Un résident essaie de soumettre son dossier, mais il n'y a aucun administrateur pour s'en occupé.",
        });
      }

      const profileUrl: string = uploadUserProfile(
        storeRenewalBodySPR.data.profile,
      );
      const NICUrl: string = uploadNIC(storeRenewalBodySPR.data.NICImage);
      const schoolCertificateUrl: string = uploadSchoolCertificate(
        storeRenewalBodySPR.data.schoolCertificate,
      );

      const renewal: RenewalFull = await renewalRepository.createFullOne({
        data: {
          emergencyNumber: storeRenewalBodySPR.data.emergencyNumber,
          phoneNumber: storeRenewalBodySPR.data.phoneNumber,
          academicSessionId: storeRenewalBodySPR.data.academicSessionId,
          facultyId: storeRenewalBodySPR.data.facultyId,
          profileUrl,
          NICUrl,
          schoolCertificateUrl,
          status: "PENDING",
          studentId: studentSession.id,
          adminId: adminWithLowestRenewals.userId,
        },
      });

      const response: StoreRenewalResponse = {
        renewal,
      };

      const io = _event.context.socketIOServer;
      io.to(`admins:${renewal.adminId}`).emit("renewals:store", {
        renewal,
      });

      return StoreRenewalDataSchema.parse(response);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
