import { prismaCtx } from "#imports";

export const createFullOne = async (payload: {
  data: prismaCtx.Prisma.ReservationCreateArgs["data"];
}): Promise<ReservationFull> => {
  const prismaClient = usePrismaClient();

  const reservationFull: ReservationFull =
    await prismaClient.reservation.create({
      data: payload.data,
      include: {
        academicSession: true,
        admin: true,
        faculty: true,
      },
    });

  return reservationFull;
};
