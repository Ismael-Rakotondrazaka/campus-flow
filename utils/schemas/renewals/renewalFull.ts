import { z, prismaCtx } from "#imports";
import { Simplify } from "type-fest";
import {
  AcademicSessionSchema,
  FacultySchema,
  StudentSchema,
  RenewalSchema,
} from "~/prisma/generated/zod";

export type RenewalFull = Simplify<
  prismaCtx.Renewal & {
    academicSession: prismaCtx.AcademicSession;
    faculty: prismaCtx.Faculty;
    student: StudentFiltered;
  }
>;

export const RenewalFullSchema: z.ZodType<RenewalFull> = RenewalSchema.and(
  z.object({
    academicSession: AcademicSessionSchema,
    faculty: FacultySchema,
    student: StudentSchema.merge(
      z.object({
        user: UserSchema,
      }),
    ),
  }),
);
