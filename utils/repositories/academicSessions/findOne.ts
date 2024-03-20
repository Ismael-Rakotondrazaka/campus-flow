import { prismaCtx } from "#imports";

export const findOne = async (payload: {
  where?: prismaCtx.Prisma.AcademicSessionWhereInput;
  orderBy?: prismaCtx.Prisma.AcademicSessionOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<prismaCtx.AcademicSession | null> => {
  const academicSession: prismaCtx.AcademicSession | null = await findOne({
    where: payload.where,
    orderBy: payload.orderBy,
    skip: payload.skip,
    take: payload.take,
  });

  return academicSession;
};
