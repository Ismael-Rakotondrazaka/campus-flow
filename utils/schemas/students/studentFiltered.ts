import { prismaCtx } from "#imports";
import { Simplify } from "type-fest";
import { StudentComputed } from "./studentComputed";

export type StudentFiltered = Simplify<
  prismaCtx.Student & {
    user: UserFiltered;
  }
>;

export const toStudentFiltered = (
  student: StudentComputed,
): StudentFiltered => {
  const studentFiltered: StudentFiltered = {
    ...student,
    user: toUserFiltered(student.user),
  };

  return studentFiltered;
};
