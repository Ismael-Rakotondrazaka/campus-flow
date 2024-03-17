import { z } from "#imports";

export type RefreshTokenObject = {
  token: string;
  expiresAt: Date;
};

export const RefreshTokenDataSchema = z.object({
  id: z.number().positive().int(),
});

/**
 * We only store id on refresh token because it won't change over the time
 */
export type RefreshTokenData = z.infer<typeof RefreshTokenDataSchema>;
