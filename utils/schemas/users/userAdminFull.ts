import { z } from "#imports";
import { AdminSchema } from "../admins/admin";
import { UserSchema } from "../users/user";

export const UserAdminFullSchema = UserSchema.and(
  z.object({
    admin: AdminSchema,
    student: z.null(),
  }),
);

export type UserAdminFull = z.infer<typeof UserAdminFullSchema>;
