import { z } from "#imports";
import { type UserAdminFull, UserAdminFullSchema } from "./userAdminFull";
import { type UserStudentFull, UserStudentFullSchema } from "./userStudentFull";

export type UserFull = UserAdminFull | UserStudentFull;

export const UserFullSchema: z.ZodType<UserFull> = z.lazy(() =>
  z.union([UserAdminFullSchema, UserStudentFullSchema]),
);
