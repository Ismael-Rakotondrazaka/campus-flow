import { z } from "#imports";

export type ResetPasswordTokenData = {
  id: number;
};

export const ResetPasswordTokenDataSchema: z.ZodType<ResetPasswordTokenData> =
  z.object({
    id: IdentifierSchema,
  });
