export default defineEventHandler(async (): Promise<StoreLodgmentResponse> => {
  try {
    const adminSession: AdminSession | null = getAdminSession();
    if (is.null(adminSession)) {
      return createUnauthorizedError();
    }

    const storeLodgmentBodySPR = await safeParseRequestBodyAs(
      StoreLodgmentBodySchema,
    );
    if (!storeLodgmentBodySPR.success) {
      return createBadRequestError({
        errorMessage: formatValidationErrorMessage(storeLodgmentBodySPR.error),
      });
    }

    const building: BuildingFull | null = await buildingRepository.findFullOne({
      where: {
        id: storeLodgmentBodySPR.data.buildingId,
        deletedAt: null,
      },
    });
    if (is.null(building)) {
      return createBadRequestError({
        errorMessage: {
          buildingId: "Le bâtiment n’existe pas.",
        },
      });
    }

    if (storeLodgmentBodySPR.data.floor > building.floors) {
      return createBadRequestError({
        errorMessage: {
          floor: "L'étage n’existe pas dans le bâtiment.",
        },
      });
    }

    const isRoomNumberExist: boolean = await lodgmentRepository.exist({
      where: {
        roomNumber: storeLodgmentBodySPR.data.roomNumber,
        buildingId: storeLodgmentBodySPR.data.buildingId,
      },
    });
    if (isRoomNumberExist) {
      return createBadRequestError({
        errorMessage: {
          floor:
            "Une chambre avec le même numéro est déjà présent dans le bâtiment.",
        },
      });
    }

    const lodgment: LodgmentFull = await lodgmentRepository.createFullOne({
      data: {
        floor: storeLodgmentBodySPR.data.floor,
        capacity: storeLodgmentBodySPR.data.capacity,
        roomNumber: storeLodgmentBodySPR.data.roomNumber,
        status: storeLodgmentBodySPR.data.status,
        buildingId: storeLodgmentBodySPR.data.buildingId,
      },
    });

    const response: StoreLodgmentResponse = {
      lodgment,
    };

    return StoreLodgmentDataSchema.parse(response);
  } catch (error) {
    return handleUnknownError(error);
  }
});
