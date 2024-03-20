import { prismaCtx } from "#imports";
import { RenewalFullRaw, renewalFullRawToRenewalFull } from "./fullRaw";

export const findFullOne = async (payload: {
  where?: prismaCtx.Prisma.RenewalWhereInput;
  orderBy?: prismaCtx.Prisma.RenewalOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<RenewalFull | null> => {
  const prismaClient = usePrismaClient();

  const refreshTokenRaw: RenewalFullRaw | null =
    await prismaClient.renewal.findFirst({
      where: payload.where,
      orderBy: payload.orderBy,
      skip: payload.skip,
      take: payload.take,
      include: {
        academicSession: true,
        faculty: true,
        student: {
          include: {
            user: true,
          },
        },
      },
    });

  if (is.null(refreshTokenRaw)) {
    return null;
  }

  return renewalFullRawToRenewalFull(refreshTokenRaw);
};
