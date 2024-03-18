import { z } from "#imports";
import { UserSchema } from "../users/user";
import { RefreshTokenSchema } from "~/prisma/generated/zod";
import { UserFiltered } from "../users";

export type RefreshTokenFull = {
  id: number;
  token: string;
  userId: number;
  expiresAt: Date;
  createdAt: Date;
  user: UserFiltered;
};

export const RefreshTokenFullSchema: z.ZodType<RefreshTokenFull> =
  RefreshTokenSchema.and(
    z.object({
      user: UserSchema,
    }),
  );
