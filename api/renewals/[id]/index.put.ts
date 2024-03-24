export default defineEventHandler(async (): Promise<UpdateRenewalResponse> => {
  try {
    const updateRenewalParamSPR = await safeParseRequestParamAs(
      UpdateRenewalParamSchema,
    );
    if (!updateRenewalParamSPR.success) {
      return createNotFoundError();
    }

    const renewal: RenewalFull = await renewalRepository.findFullOneOrFail({
      where: {
        id: updateRenewalParamSPR.data.id,
      },
    });

    const adminSession: AdminSession | null = getAdminSession();
    if (is.null(adminSession)) {
      return createUnauthorizedError();
    }

    if (
      !(adminSession.id === renewal.adminId || adminSession.role === "ROOT")
    ) {
      return createForbiddenError();
    }

    if (
      !(
        renewal.status !== "PENDING" ||
        (renewal.status === "PENDING" && adminSession.role !== "ROOT")
      )
    ) {
      return createBadRequestError({
        message:
          "La demande de renouvellement ne peut être modifiée une fois refusée, acceptée, ou validée.",
        errorMessage: {},
      });
    }

    const updateRenewalBodySPR = await safeParseRequestBodyAs(
      UpdateRenewalBodySchema,
    );
    if (!updateRenewalBodySPR.success) {
      return createBadRequestError({
        errorMessage: formatValidationErrorMessage(updateRenewalBodySPR.error),
      });
    }

    if (updateRenewalBodySPR.data.status === renewal.status) {
      return createBadRequestError({
        message: "Au moins une modification est requise.",
        errorMessage: {},
      });
    }

    const updatedRenewal: RenewalFull = await renewalRepository.updateFullOne({
      where: {
        id: renewal.id,
      },
      data: {
        status: updateRenewalBodySPR.data.status,
      },
    });

    if (updateRenewalBodySPR.data.status === "ACCEPTED") {
      await handleRenewalAccepted(updatedRenewal);
    } else if (updateRenewalBodySPR.data.status === "REFUSED") {
      await handleRenewalRefused(updatedRenewal);
    } else if (updateRenewalBodySPR.data.status === "VALIDATED") {
      if (renewal.status !== "ACCEPTED") {
        return createBadRequestError({
          message:
            "La demande de renouvellement doit être acceptée avant d'être validée.",
          errorMessage: {
            status:
              "La demande de renouvellement doit être acceptée avant d'être validée.",
          },
        });
      } else {
        await handleRenewalValidated(updatedRenewal);
      }
    }

    const response: UpdateRenewalResponse = {
      renewal: updatedRenewal,
    };

    return UpdateRenewalDataSchema.parse(response);
  } catch (error) {
    return handleUnknownError(error);
  }
});
