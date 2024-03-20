import { z } from "#imports";

/**
 * We only store id on refresh token because it won't change over the time
 */
export type RefreshTokenData = {
  id: number;
};

export const RefreshTokenDataSchema: z.ZodType<RefreshTokenData> = z.object({
  id: z.number().positive().int(),
});
