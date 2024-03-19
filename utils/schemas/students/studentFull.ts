import { prismaCtx, z } from "#imports";
import { Simplify } from "type-fest";
import { FacultySchema, StudentSchema } from "~/prisma/generated/zod";

export type StudentFull = Simplify<
  prismaCtx.Student &
    StudentCount & {
      user: UserFiltered;
      lodgment: LodgmentFull;
      faculty: prismaCtx.Faculty;
    }
>;

export const StudentFullSchema: z.ZodType<StudentFull> = StudentSchema.and(
  StudentCountSchema,
).and(
  z.object({
    user: UserSchema,
    lodgment: LodgmentFullSchema,
    faculty: FacultySchema,
  }),
);
