import { prismaCtx, z } from "#imports";
import { ReservationFull, ReservationFullSchema } from "./reservationFull";
import { Simplify } from "type-fest";

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
  status: Exclude<prismaCtx.$Enums.ReservationStatus, "PENDING">;
};

export const UpdateReservationBodySchema: z.ZodType<
  Simplify<UpdateReservationBody>
> = z.object({
  status: z.enum(["ACCEPTED", "REFUSED", "VALIDATED"]),
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
