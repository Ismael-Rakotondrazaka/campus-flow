import { prismaCtx, z } from "#imports";
import { RefusalReasonSchema } from "~/prisma/generated/zod";
import { RenewalFull, RenewalFullSchema } from "./renewalFull";

/* -------------------------------------------------------------------------- */
/*                            UpdateRenewal param                            */
/* -------------------------------------------------------------------------- */

export type UpdateRenewalParam = {
  id: number;
};

export const UpdateRenewalParamSchema: z.ZodType<UpdateRenewalParam> = z.object(
  {
    id: IdentifierSchema,
  },
);

/* -------------------------------------------------------------------------- */
/*                             UpdateRenewal body                             */
/* -------------------------------------------------------------------------- */

export type UpdateRenewalBody = {
  status: Exclude<prismaCtx.$Enums.RenewalStatus, "PENDING">;
  refusalReason?: prismaCtx.RefusalReason;
};

export type UpdateRenewalBodyInput = {
  status: Exclude<prismaCtx.$Enums.RenewalStatus, "PENDING">;
  refusalReason?: prismaCtx.RefusalReason | string;
};

export const UpdateRenewalBodySchema: z.ZodType<
  UpdateRenewalBody,
  z.ZodTypeDef,
  UpdateRenewalBodyInput
> = z.object({
  status: z.enum(["ACCEPTED", "REFUSED", "VALIDATED"]),
  refusalReason: z.union([RefusalReasonSchema, CustomUndefinedSchema]),
});

/* -------------------------------------------------------------------------- */
/*                             UpdateRenewal data                             */
/* -------------------------------------------------------------------------- */

export type UpdateRenewalData = {
  renewal: RenewalFull;
};
export const UpdateRenewalDataSchema: z.ZodType<UpdateRenewalData> = z.object({
  renewal: RenewalFullSchema,
});

/* -------------------------------------------------------------------------- */
/*                             UpdateRenewal error                            */
/* -------------------------------------------------------------------------- */

export type UpdateRenewalBodyPEM = RequestErrorMessage<UpdateRenewalBody>;

export type UpdateRenewalError = RequestError<UpdateRenewalBodyPEM>;

export type UpdateRenewalResponse = RequestResponse<
  UpdateRenewalData,
  UpdateRenewalBody
>;
