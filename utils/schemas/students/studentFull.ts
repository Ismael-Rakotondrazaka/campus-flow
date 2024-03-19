import { prismaCtx, z } from "#imports";
import { Simplify } from "type-fest";
import {
  BuildingSchema,
  FacultySchema,
  LodgmentSchema,
  StudentSchema,
} from "~/prisma/generated/zod";

export type StudentFull = Simplify<
  prismaCtx.Student &
    StudentCount & {
      user: UserFiltered;
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
  }),
);
