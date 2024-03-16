import { z } from "#imports";
import { StudentSchema } from "../students/student";
import { UserSchema } from "../users/user";

export const UserStudentFullSchema = UserSchema.and(
  z.object({
    admin: z.null(),
    student: StudentSchema,
  }),
);

export type UserStudentFull = z.infer<typeof UserStudentFullSchema>;
