import { prismaCtx, z } from "#imports";
import { ReservationStatusSchema } from "~/prisma/generated/zod";
import { ReservationFull, ReservationFullSchema } from "./reservationFull";

/* -------------------------------------------------------------------------- */
/*                            UpdateReservation param                            */
/* -------------------------------------------------------------------------- */

export type UpdateReservationParam = {
  id: number;
};

export const UpdateReservationParamSchema: z.ZodType<UpdateReservationParam> =
  z.object({
    id: IdentifierSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             UpdateReservation body                             */
/* -------------------------------------------------------------------------- */

export type UpdateReservationBody = {
  status: Omit<prismaCtx.$Enums.ReservationStatus, "PENDING">;
};

export const UpdateReservationBodySchema: z.ZodType<UpdateReservationBody> =
  z.object({
    status: ReservationStatusSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             UpdateReservation data                             */
/* -------------------------------------------------------------------------- */

export type UpdateReservationData = {
  reservation: ReservationFull;
};
export const UpdateReservationDataSchema: z.ZodType<UpdateReservationData> =
  z.object({
    reservation: ReservationFullSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             UpdateReservation error                            */
/* -------------------------------------------------------------------------- */

export type UpdateReservationBodyPEM =
  RequestErrorMessage<UpdateReservationBody>;

export type UpdateReservationError = RequestError<UpdateReservationBodyPEM>;

export type UpdateReservationResponse = RequestResponse<
  UpdateReservationData,
  UpdateReservationBody
>;
