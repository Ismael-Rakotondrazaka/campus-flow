import { prismaCtx } from "#imports";
import { Simplify } from "type-fest";

export type StudentComputed = Simplify<
  prismaCtx.Student & {
    user: UserComputed;
  }
>;
