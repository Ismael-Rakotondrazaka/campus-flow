import { prismaCtx, z } from "#imports";
import { LodgmentStatusSchema } from "~/prisma/generated/zod";
import { LodgmentFull } from "./lodgmentFull";
import { lodgmentConfig } from "~/utils/configs/lodgmentConfig";

/* -------------------------------------------------------------------------- */
/*                             StoreLodgment body                             */
/* -------------------------------------------------------------------------- */

export type StoreLodgmentBody = {
  capacity: number;
  floor: number;
  roomNumber: number;
  buildingId: number;
  status: prismaCtx.$Enums.LodgmentStatus;
};

// ! use this one on client-side
export type StoreLodgmentBodyInput = {
  capacity: number;
  floor: number;
  roomNumber: number;
  buildingId: number;
  status?: prismaCtx.$Enums.LodgmentStatus;
};

export const StoreLodgmentBodySchema: z.ZodType<
  StoreLodgmentBody,
  z.ZodTypeDef,
  StoreLodgmentBodyInput
> = z.object({
  capacity: z.coerce.number().int().nonnegative(),
  floor: z.coerce.number().int().nonnegative(),
  roomNumber: z.coerce.number().int().nonnegative(),
  buildingId: IdentifierSchema,
  status: LodgmentStatusSchema.optional().default(
    lodgmentConfig.STATUS_DEFAULT_VALUE,
  ),
});

/* -------------------------------------------------------------------------- */
/*                             StoreLodgment data                             */
/* -------------------------------------------------------------------------- */

export type StoreLodgmentData = {
  lodgment: LodgmentFull;
};
export const StoreLodgmentDataSchema: z.ZodType<StoreLodgmentData> = z.object({
  lodgment: LodgmentFullSchema,
});
/* -------------------------------------------------------------------------- */
/*                             StoreLodgment error                            */
/* -------------------------------------------------------------------------- */

export type StoreLodgmentBodyPEM = RequestErrorMessage<StoreLodgmentBody>;

export type StoreLodgmentError = RequestError<StoreLodgmentBodyPEM>;

export type StoreLodgmentResponse = RequestResponse<
  StoreLodgmentData,
  StoreLodgmentBody
>;
