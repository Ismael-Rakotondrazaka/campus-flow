import { prismaCtx } from "#imports";
import { Simplify } from "type-fest";

export type UserFullRaw = Simplify<
  UserComputed & {
    admin: prismaCtx.Admin | null;
    student: prismaCtx.Student | null;
  }
>;

export const userFullRawToUserFull = (user: UserFullRaw): UserFull => {
  if (user.admin !== null && user.student === null) {
    return {
      ...toUserFiltered(user),
      admin: user.admin,
      student: null,
    };
  } else if (user.student !== null && user.admin === null) {
    return {
      ...toUserFiltered(user),
      admin: null,
      student: user.student,
    };
  } else {
    throw new Error("User is neither an admin nor a student or both.");
  }
};
