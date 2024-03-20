export default defineEventHandler(async (): Promise<UpdateLodgmentResponse> => {
  try {
    const updateLodgmentParamSPR = await safeParseRequestParamAs(
      UpdateLodgmentParamSchema,
    );
    if (!updateLodgmentParamSPR.success) {
      return createNotFoundError();
    }

    const lodgment: LodgmentFull = await lodgmentRepository.findFullOneOrFail({
      where: {
        id: updateLodgmentParamSPR.data.id,
      },
    });

    const adminSession: AdminSession | null = getAdminSession();
    if (is.null(adminSession)) {
      return createUnauthorizedError();
    }

    const updateLodgmentBodySPR = await safeParseRequestBodyAs(
      UpdateLodgmentBodySchema,
    );
    if (!updateLodgmentBodySPR.success) {
      return createBadRequestError({
        errorMessage: formatValidationErrorMessage(updateLodgmentBodySPR.error),
      });
    }

    if (
      !(
        (!is.undefined(updateLodgmentBodySPR.data.capacity) &&
          updateLodgmentBodySPR.data.capacity !== lodgment.capacity) ||
        (!is.undefined(updateLodgmentBodySPR.data.floor) &&
          updateLodgmentBodySPR.data.floor !== lodgment.floor) ||
        (!is.undefined(updateLodgmentBodySPR.data.buildingId) &&
          updateLodgmentBodySPR.data.buildingId !== lodgment.buildingId) ||
        (!is.undefined(updateLodgmentBodySPR.data.roomNumber) &&
          updateLodgmentBodySPR.data.roomNumber !== lodgment.roomNumber) ||
        (!is.undefined(updateLodgmentBodySPR.data.status) &&
          updateLodgmentBodySPR.data.status !== lodgment.status)
      )
    ) {
      return createBadRequestError({
        message: "Au moins une modification est requise.",
        errorMessage: {},
      });
    }

    if (!is.undefined(updateLodgmentBodySPR.data.buildingId)) {
      const building: BuildingFull | null =
        await buildingRepository.findFullOne({
          where: {
            id: updateLodgmentBodySPR.data.buildingId,
          },
        });
      if (is.null(building)) {
        return createBadRequestError({
          errorMessage: {
            buildingId: "Le bâtiment n’existe pas.",
          },
        });
      }

      if (!is.undefined(updateLodgmentBodySPR.data.floor)) {
        if (updateLodgmentBodySPR.data.floor > building.floors) {
          return createBadRequestError({
            errorMessage: {
              floor: "L'étage n’existe pas dans le bâtiment.",
            },
          });
        }
      }

      if (!is.undefined(updateLodgmentBodySPR.data.roomNumber)) {
        const isRoomNumberExist: boolean = await lodgmentRepository.exist({
          where: {
            roomNumber: updateLodgmentBodySPR.data.roomNumber,
            buildingId: building.id,
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
      }
    } else {
      if (!is.undefined(updateLodgmentBodySPR.data.floor)) {
        const building: BuildingFull =
          await buildingRepository.findFullOneOrFail({
            where: {
              id: lodgment.buildingId,
            },
          });

        if (updateLodgmentBodySPR.data.floor > building.floors) {
          return createBadRequestError({
            errorMessage: {
              floor: "L'étage n’existe pas dans le bâtiment.",
            },
          });
        }
      }

      if (!is.undefined(updateLodgmentBodySPR.data.capacity)) {
        if (updateLodgmentBodySPR.data.capacity < lodgment._count.students) {
          return createBadRequestError({
            errorMessage: {
              capacity:
                "La capacité est inférieure au nombre d'étudiant résidant actuellement dans cette chambre. Transférez-les d'abord.",
            },
          });
        }
      }

      if (!is.undefined(updateLodgmentBodySPR.data.roomNumber)) {
        const isRoomNumberExist: boolean = await lodgmentRepository.exist({
          where: {
            roomNumber: updateLodgmentBodySPR.data.roomNumber,
            buildingId: lodgment.buildingId,
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
      }
    }

    const updatedLodgment: LodgmentFull =
      await lodgmentRepository.updateFullOne({
        where: {
          id: lodgment.id,
        },
        data: {
          floor: updateLodgmentBodySPR.data.floor,
          capacity: updateLodgmentBodySPR.data.capacity,
          roomNumber: updateLodgmentBodySPR.data.roomNumber,
          status: updateLodgmentBodySPR.data.status,
          buildingId: updateLodgmentBodySPR.data.buildingId,
        },
      });

    const response: UpdateLodgmentResponse = {
      lodgment: updatedLodgment,
    };

    return UpdateLodgmentDataSchema.parse(response);
  } catch (error) {
    return handleUnknownError(error);
  }
});
