import { prismaCtx, z } from "#imports";
import { RenewalStatusSchema } from "~/prisma/generated/zod";
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
  status: Omit<prismaCtx.$Enums.RenewalStatus, "PENDING">;
};

export const UpdateRenewalBodySchema: z.ZodType<UpdateRenewalBody> = z.object({
  status: RenewalStatusSchema,
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
