import { z } from "#imports";

export type RefreshTokenFiltered = {
  token: string;
  expiresAt: Date;
};

export const RefreshTokenFilteredData: z.ZodType<RefreshTokenFiltered> =
  z.object({
    token: z.string(),
    expiresAt: z.date(),
  });
