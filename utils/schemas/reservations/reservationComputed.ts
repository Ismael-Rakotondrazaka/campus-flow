import { prismaCtx } from "#imports";
import { Simplify } from "type-fest";

/**
 * Added virtual fields:
 * - fullName @type string
 */
export type ReservationComputed = Simplify<
  prismaCtx.Reservation & {
    fullName: string;
  }
>;
