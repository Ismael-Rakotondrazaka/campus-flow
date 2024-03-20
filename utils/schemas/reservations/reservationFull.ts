import { z, prismaCtx } from "#imports";
import { Simplify } from "type-fest";
import { AcademicSessionSchema, FacultySchema } from "~/prisma/generated/zod";
import { ReservationSchema } from "./reservation";

export type ReservationFull = Simplify<
  ReservationComputed & {
    academicSession: prismaCtx.AcademicSession;
    faculty: prismaCtx.Faculty;
  }
>;

export const ReservationFullSchema: z.ZodType<ReservationFull> =
  ReservationSchema.and(
    z.object({
      academicSession: AcademicSessionSchema,
      faculty: FacultySchema,
    }),
  );
