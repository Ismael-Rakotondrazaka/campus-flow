import { prismaCtx } from "#imports";

export const findOne = async (payload: {
  where?: prismaCtx.Prisma.FacultyWhereInput;
  orderBy?: prismaCtx.Prisma.FacultyOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<prismaCtx.Faculty | null> => {
  const faculty: prismaCtx.Faculty | null = await findOne({
    where: payload.where,
    orderBy: payload.orderBy,
    skip: payload.skip,
    take: payload.take,
  });

  return faculty;
};
