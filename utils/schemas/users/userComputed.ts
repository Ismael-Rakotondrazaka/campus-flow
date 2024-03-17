import { prismaCtx } from "#imports";
import { Simplify } from "type-fest";

/**
 * Added virtual fields:
 * - fullName @type string
 */
export type UserComputed = Simplify<
  prismaCtx.User & {
    fullName: string;
  }
>;
