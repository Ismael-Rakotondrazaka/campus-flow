import { prismaCtx } from "#imports";

export default defineEventHandler(
  async (_event): Promise<StoreReservationResponse> => {
    try {
      const storeReservationBodySPR = await safeParseRequestBodyAs(
        StoreReservationBodySchema,
      );
      if (!storeReservationBodySPR.success) {
        return createBadRequestError({
          errorMessage: formatValidationErrorMessage(
            storeReservationBodySPR.error,
          ),
        });
      }

      const isEmailUsedByAResident: boolean = await userRepository.exist({
        where: {
          email: storeReservationBodySPR.data.email,
        },
      });
      if (isEmailUsedByAResident) {
        return createBadRequestError({
          errorMessage: {
            email: "Cette adresse mail est déjà utilisée par un résident.",
          },
        });
      }
      const isEmailUsedForAReservationWithThisAcademicSession: boolean =
        await reservationRepository.exist({
          where: {
            email: storeReservationBodySPR.data.email,
            academicSessionId: storeReservationBodySPR.data.academicSessionId,
          },
        });
      if (isEmailUsedForAReservationWithThisAcademicSession) {
        return createBadRequestError({
          errorMessage: {
            email:
              "Cette adresse mail est déjà utilisée pour une demande pour cette année universitaire.",
          },
        });
      }

      const isNICUsedByAResident: boolean = await studentRepository.exist({
        where: {
          NIC: storeReservationBodySPR.data.NIC,
        },
      });
      if (isNICUsedByAResident) {
        return createBadRequestError({
          errorMessage: {
            email: "Cette CIN est déjà utilisée par un résident.",
          },
        });
      }

      const isNICUsedForAReservationWithThisAcademicSession: boolean =
        await reservationRepository.exist({
          where: {
            NIC: storeReservationBodySPR.data.NIC,
            academicSessionId: storeReservationBodySPR.data.academicSessionId,
          },
        });
      if (isNICUsedForAReservationWithThisAcademicSession) {
        return createBadRequestError({
          errorMessage: {
            email:
              "Cette CIN est déjà utilisée pour une demande pour cette année universitaire.",
          },
        });
      }

      const isFacultyExist: boolean = await facultyRepository.exist({
        where: {
          id: storeReservationBodySPR.data.facultyId,
          deletedAt: null,
        },
      });
      if (!isFacultyExist) {
        return createBadRequestError({
          errorMessage: {
            facultyId: "La faculté n’existe pas au sein de l'université.",
          },
        });
      }

      const isAcademicSessionExist: boolean = await facultyRepository.exist({
        where: {
          id: storeReservationBodySPR.data.academicSessionId,
          deletedAt: null,
        },
      });
      if (!isAcademicSessionExist) {
        return createBadRequestError({
          errorMessage: {
            academicSessionId: "L'année universitaire n'est pas ouverte.",
          },
        });
      }

      const profileUrl: string = uploadUserProfile(
        storeReservationBodySPR.data.profile,
      );
      const NICUrl: string = uploadNIC(storeReservationBodySPR.data.NICImage);
      const schoolCertificateUrl: string = uploadSchoolCertificate(
        storeReservationBodySPR.data.schoolCertificate,
      );

      const adminWithLowestReservations: prismaCtx.Admin | null =
        await adminRepository.findOne({
          where: {
            role: "RESERVATION",
            user: {
              deletedAt: null,
            },
          },
          orderBy: {
            reservations: {
              _count: "asc",
            },
          },
          take: 1,
        });
      if (is.null(adminWithLowestReservations)) {
        throw createServerError({
          isPrivate: true,
          message:
            "Un étudiant essaie de soumettre son dossier, mais il n'y a aucun administrateur pour s'en occupé.",
        });
      }

      // TODO notify the user

      const reservation: ReservationFull =
        await reservationRepository.createFullOne({
          data: {
            name: storeReservationBodySPR.data.name,
            firstName: storeReservationBodySPR.data.firstName,
            phoneNumber: storeReservationBodySPR.data.phoneNumber,
            profileUrl,
            email: storeReservationBodySPR.data.email,
            emergencyNumber: storeReservationBodySPR.data.emergencyNumber,
            NIC: storeReservationBodySPR.data.NIC,
            NICUrl,
            schoolCertificateUrl,
            facultyId: storeReservationBodySPR.data.facultyId,
            status: "PENDING",
            academicSessionId: storeReservationBodySPR.data.academicSessionId,
            origin: storeReservationBodySPR.data.origin,
            gender: storeReservationBodySPR.data.gender,
            adminId: adminWithLowestReservations.userId,
          },
        });

      await handleReservationCreated(reservation);

      const response: StoreReservationResponse = {
        reservation,
      };

      const io = _event.context.socketIOServer;
      io.to(`admins:${reservation.adminId}`).emit("reservations:store", {
        reservation,
      });

      return StoreReservationDataSchema.parse(response);
    } catch (error) {
      return handleUnknownError(error);
    }
  },
);
