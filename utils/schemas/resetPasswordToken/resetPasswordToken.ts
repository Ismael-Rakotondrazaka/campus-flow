import { z } from "#imports";

export type ResetPasswordToken = {
  token: string;
  expiresAt: Date;
};

export const ResetPasswordTokenSchema: z.ZodType<ResetPasswordToken> = z.object(
  {
    token: z.string(),
    expiresAt: z.coerce.date(),
  },
);
