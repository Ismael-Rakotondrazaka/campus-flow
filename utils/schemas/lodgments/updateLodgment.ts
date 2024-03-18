import { prismaCtx, z } from "#imports";
import { LodgmentStatusSchema } from "~/prisma/generated/zod";
import { LodgmentFull } from "./lodgmentFull";

/* -------------------------------------------------------------------------- */
/*                            UpdateLodgment param                            */
/* -------------------------------------------------------------------------- */

export type UpdateLodgmentParam = {
  id: number;
};

export const UpdateLodgmentParamSchema: z.ZodType<UpdateLodgmentParam> =
  z.object({
    id: IdentifierSchema,
  });

/* -------------------------------------------------------------------------- */
/*                             UpdateLodgment body                             */
/* -------------------------------------------------------------------------- */

export type UpdateLodgmentBody = {
  capacity?: number | undefined;
  floor?: number | undefined;
  roomNumber?: number | undefined;
  buildingId?: number | undefined;
  status?: prismaCtx.$Enums.LodgmentStatus;
};

export const UpdateLodgmentBodySchema: z.ZodType<UpdateLodgmentBody> = z
  .object({
    capacity: z.coerce.number().int().nonnegative(),
    floor: z.coerce.number().int().nonnegative(),
    roomNumber: z.coerce.number().int().nonnegative(),
    buildingId: IdentifierSchema,
    status: LodgmentStatusSchema,
  })
  .partial();

/* -------------------------------------------------------------------------- */
/*                             UpdateLodgment data                             */
/* -------------------------------------------------------------------------- */

export type UpdateLodgmentData = {
  lodgment: LodgmentFull;
};
export const UpdateLodgmentDataSchema: z.ZodType<UpdateLodgmentData> = z.object(
  {
    lodgment: LodgmentFullSchema,
  },
);

/* -------------------------------------------------------------------------- */
/*                             UpdateLodgment error                            */
/* -------------------------------------------------------------------------- */

export type UpdateLodgmentBodyPEM = RequestErrorMessage<UpdateLodgmentBody>;

export type UpdateLodgmentError = RequestError<UpdateLodgmentBodyPEM>;

export type UpdateLodgmentResponse = RequestResponse<
  UpdateLodgmentData,
  UpdateLodgmentBody
>;
