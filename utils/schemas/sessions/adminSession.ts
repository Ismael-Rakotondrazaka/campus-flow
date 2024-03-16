import { type Simplify } from "type-fest";
import { z } from "#imports";
import { UserBaseSessionSchema } from "./userBaseSession";

export const AdminSessionSchema = UserBaseSessionSchema.and(
  z.object({
    role: RoleSchema,
  }),
);

export type AdminSession = Simplify<z.infer<typeof AdminSessionSchema>>;
