import { prismaCtx } from "#imports";

export const findFullOne = async (payload: {
  where?: prismaCtx.Prisma.ReservationWhereInput;
  orderBy?: prismaCtx.Prisma.ReservationOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<ReservationFull | null> => {
  const prismaClient = usePrismaClient();

  const reservationFull: ReservationFull | null =
    await prismaClient.reservation.findFirst({
      where: payload.where,
      orderBy: payload.orderBy,
      skip: payload.skip,
      take: payload.take,
      include: {
        academicSession: true,
        faculty: true,
      },
    });

  return reservationFull;
};
