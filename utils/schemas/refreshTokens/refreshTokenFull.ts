import { z } from "#imports";
import { Simplify } from "type-fest";

export const RefreshTokenFullSchema = RefreshTokenSchema.and(
  z.object({
    user: UserSchema,
  }),
);

export type RefreshTokenFull = Simplify<z.infer<typeof RefreshTokenFullSchema>>;
