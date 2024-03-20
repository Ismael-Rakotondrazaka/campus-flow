import { prismaCtx } from "#imports";
import { Simplify } from "type-fest";

export type AdminComputed = Simplify<
  prismaCtx.Admin & {
    user: UserComputed;
  }
>;
