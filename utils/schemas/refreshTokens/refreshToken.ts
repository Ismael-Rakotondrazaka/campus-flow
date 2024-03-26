import { z, prismaCtx } from "#imports";

export const RefreshTokenSchema: z.ZodType<prismaCtx.RefreshToken> = z.object({
  id: z.number().int(),
  token: z.string(),
  userId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  expiresAt: z.coerce.date(),
});
