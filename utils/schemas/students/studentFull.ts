import { prismaCtx, z } from "#imports";
import { Simplify } from "type-fest";
import {
  AcademicSessionSchema,
  BuildingSchema,
  FacultySchema,
  LodgmentSchema,
  StudentSchema,
} from "~/prisma/generated/zod";

export type StudentFull = Simplify<
  prismaCtx.Student &
    StudentCount & {
      user: UserFiltered;
      academicSession: prismaCtx.AcademicSession;
      faculty: prismaCtx.Faculty;
      lodgment: prismaCtx.Lodgment & {
        building: prismaCtx.Building;
      };
    }
>;

export const StudentFullSchema: z.ZodType<StudentFull> = StudentSchema.and(
  StudentCountSchema,
).and(
  z.object({
    user: UserSchema,
    lodgment: LodgmentSchema.merge(
      z.object({
        building: BuildingSchema,
      }),
    ),
    faculty: FacultySchema,
    academicSession: AcademicSessionSchema,
  }),
);
