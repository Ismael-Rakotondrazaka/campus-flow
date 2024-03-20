import { z, prismaCtx } from "#imports";
import { Simplify } from "type-fest";
import { UserSchema } from "../users/user";
import { StudentSchema } from "~/prisma/generated/zod";
import { UserFiltered } from "./userFiltered";

export type UserStudentExtra = {
  student: prismaCtx.Student;
  admin: null;
};

export const UserStudentExtraSchema: z.ZodType<UserStudentExtra> = z.object({
  admin: z.null(),
  student: StudentSchema,
});

export type UserStudentFull = Simplify<UserFiltered & UserStudentExtra>;

export const UserStudentFullSchema: z.ZodType<UserStudentFull> = UserSchema.and(
  UserStudentExtraSchema,
);
