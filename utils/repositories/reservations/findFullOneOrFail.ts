import { prismaCtx } from "#imports";
import { findFullOne } from "./findFullOne";

export const findFullOneOrFail = async (payload: {
  where?: prismaCtx.Prisma.ReservationWhereInput;
  orderBy?: prismaCtx.Prisma.ReservationOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<ReservationFull> => {
  const reservation: ReservationFull | null = await findFullOne({
    where: payload.where,
    orderBy: payload.orderBy,
    skip: payload.skip,
    take: payload.take,
  });

  if (is.null(reservation)) {
    throw createNotFoundError();
  }

  return reservation;
};
