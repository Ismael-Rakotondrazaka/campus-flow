import { z } from "#imports";

export type AccessToken = {
  token: string;
  expiresAt: Date;
};

export const AccessTokenSchema: z.ZodType<AccessToken> = z.object({
  token: z.string(),
  expiresAt: z.date(),
});
