import { z, prismaCtx } from "#imports";
import { Simplify } from "type-fest";
import {
  ReservationOrderByWithRelationInputSchema,
  ReservationWhereInputSchema,
} from "~/prisma/generated/zod";
import { ReservationFull, ReservationFullSchema } from "./reservationFull";

/* -------------------------------------------------------------------------- */
/*                             IndexReservation query                             */
/* -------------------------------------------------------------------------- */

export type IndexReservationQuery = Simplify<
  {
    where?: prismaCtx.Prisma.ReservationWhereInput;
    orderBy?: prismaCtx.Prisma.ReservationOrderByWithRelationInput;
  } & PaginationQuery
>;

// ! we this type on client-side
export type IndexReservationQueryInput = Partial<IndexReservationQuery>;

export const IndexReservationQuerySchema: z.ZodType<
  IndexReservationQuery,
  z.ZodTypeDef,
  IndexReservationQueryInput
> = z
  .object({
    where: ReservationWhereInputSchema,
    orderBy: ReservationOrderByWithRelationInputSchema,
  })
  .partial()
  .and(makePaginationQuery(reservationConfig.PAGE_SIZE_DEFAULT_VALUE));

/* -------------------------------------------------------------------------- */
/*                             IndexReservation data                             */
/* -------------------------------------------------------------------------- */

export type IndexReservationData = Simplify<
  {
    reservations: ReservationFull[];
  } & Pagination
>;

export const IndexReservationDataSchema: z.ZodType<IndexReservationData> = z
  .object({
    reservations: z.array(ReservationFullSchema),
  })
  .and(PaginationSchema);

/* -------------------------------------------------------------------------- */
/*                             IndexReservation error                            */
/* -------------------------------------------------------------------------- */

export type IndexReservationQueryPEM =
  RequestErrorMessage<IndexReservationQuery>;

export type IndexReservationError = RequestError<IndexReservationQueryPEM>;

export type IndexReservationResponse = RequestResponse<
  IndexReservationData,
  IndexReservationQuery
>;
