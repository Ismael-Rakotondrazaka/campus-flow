import { prismaCtx, z } from "#imports";
import { RefusalReasonSchema } from "~/prisma/generated/zod";
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

/**
 * If status is `VALIDATED`, lodgmentId is required.
 */
export type UpdateReservationBody = {
  status: Exclude<prismaCtx.$Enums.ReservationStatus, "PENDING">;
  lodgmentId?: number;
  refusalReason?: prismaCtx.RefusalReason;
};

export type UpdateReservationBodyInput = {
  status: Exclude<prismaCtx.$Enums.ReservationStatus, "PENDING">;
  lodgmentId?: number;
  refusalReason?: prismaCtx.RefusalReason | string;
};

export const UpdateReservationBodySchema: z.ZodType<
  Simplify<UpdateReservationBody>,
  z.ZodTypeDef,
  UpdateReservationBodyInput
> = z.object({
  status: z.enum(["ACCEPTED", "REFUSED", "VALIDATED"]),
  lodgmentId: z.coerce.number().optional(),
  refusalReason: z.union([RefusalReasonSchema, CustomUndefinedSchema]),
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
