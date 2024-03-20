import { z } from "#imports";
import { AdminSchema } from "~/prisma/generated/zod";
import { UserSchema } from "../users/user";
import { Simplify } from "type-fest";

export type UserAdminExtra = {
  admin: {
    role: "ROOT" | "MAINTENANCE" | "RENEWAL" | "RESERVATION";
    userId: number;
  };
  student: null;
};

export const UserAdminExtraSchema: z.ZodType<UserAdminExtra> = z.object({
  admin: AdminSchema,
  student: z.null(),
});

export type UserAdminFull = Simplify<UserFiltered & UserAdminExtra>;

export const UserAdminFullSchema: z.ZodType<UserAdminFull> = UserSchema.and(
  z.object({
    admin: AdminSchema,
    student: z.null(),
  }),
);

export const isUserAdminFull = (data: UserFull): data is UserAdminFull => {
  return UserAdminFullSchema.safeParse(data).success;
};
