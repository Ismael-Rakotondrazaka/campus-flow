import { z } from "#imports";
import { type UserAdminFull, UserAdminFullSchema } from "./userAdminFull";
import { type UserStudentFull, UserStudentFullSchema } from "./userStudentFull";

export const UserFullSchema: z.ZodType<UserAdminFull | UserStudentFull> =
  z.lazy(() => z.union([UserAdminFullSchema, UserStudentFullSchema]));

export type UserFull = z.infer<typeof UserFullSchema>;
