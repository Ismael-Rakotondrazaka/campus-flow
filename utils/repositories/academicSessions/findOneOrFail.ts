import { prismaCtx } from "#imports";
import { findOne } from "./findOne";

export const findOneOrFail = async (payload: {
  where?: prismaCtx.Prisma.AcademicSessionWhereInput;
  orderBy?: prismaCtx.Prisma.AcademicSessionOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<prismaCtx.AcademicSession> => {
  const academicSession: prismaCtx.AcademicSession | null = await findOne({
    where: payload.where,
    orderBy: payload.orderBy,
    skip: payload.skip,
    take: payload.take,
  });

  if (is.null(academicSession)) {
    throw createNotFoundError();
  }

  return academicSession;
};
