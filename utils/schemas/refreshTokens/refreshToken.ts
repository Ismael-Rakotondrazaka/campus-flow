import { z, prismaCtx } from "#imports";

export const RefreshTokenSchema: z.ZodType<prismaCtx.RefreshToken> = z.object({
  id: z.number().int(),
  token: z.string(),
  userId: z.number().int(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date(),
});
