import { prismaCtx } from "#imports";
import { Simplify } from "type-fest";

export type RenewalFullRaw = Simplify<
  prismaCtx.Renewal & {
    faculty: prismaCtx.Faculty;
    academicSession: prismaCtx.AcademicSession;
    student: prismaCtx.Student & {
      user: UserComputed;
    };
  }
>;

export const renewalFullRawToRenewalFull = (
  renewal: RenewalFullRaw,
): RenewalFull => {
  const renewalFull: RenewalFull = {
    ...renewal,
    student: {
      ...renewal.student,
      user: toUserFiltered(renewal.student.user),
    },
  };

  return renewalFull;
};
