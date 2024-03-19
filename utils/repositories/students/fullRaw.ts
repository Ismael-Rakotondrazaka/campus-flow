import { prismaCtx } from "#imports";
import { Simplify } from "type-fest";

export type StudentFullRaw = Simplify<
  prismaCtx.Student & {
    _count: {
      renewals: number;
    };
  } & {
    user: UserComputed;
    faculty: prismaCtx.Faculty;
    lodgment: prismaCtx.Lodgment & {
      building: prismaCtx.Building;
    };
  }
>;

export const studentFullRawToStudentFull = (
  student: StudentFullRaw,
): StudentFull => {
  const studentFull: StudentFull = {
    userId: student.userId,
    emergencyNumber: student.emergencyNumber,
    facultyId: student.facultyId,
    gender: student.gender,
    lodgmentId: student.lodgmentId,
    nationality: student.nationality,
    NIC: student.NIC,
    _count: student._count,
    user: toUserFiltered(student.user),
    faculty: student.faculty,
    lodgment: student.lodgment,
  };

  return studentFull;
};
