import { z } from "#imports";
import { ReservationFull, ReservationFullSchema } from "./reservationFull";

/* -------------------------------------------------------------------------- */
/*                            ShowReservation param                            */
/* -------------------------------------------------------------------------- */

export type ShowReservationParam = {
  id: number;
};

export const ShowReservationParamSchema: z.ZodType<ShowReservationParam> =
  z.object({
    id: IdentifierSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             ShowReservation data                             */
/* -------------------------------------------------------------------------- */

export type ShowReservationData = {
  reservation: ReservationFull;
};

export const ShowReservationDataSchema: z.ZodType<ShowReservationData> =
  z.object({
    reservation: ReservationFullSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             ShowReservation error                            */
/* -------------------------------------------------------------------------- */

export type ShowReservationBodyPEM = RequestErrorMessage<Record<string, never>>;

export type ShowReservationError = RequestError<ShowReservationBodyPEM>;

export type ShowReservationResponse = RequestResponse<
  ShowReservationData,
  Record<string, never>
>;
