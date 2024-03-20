import { prismaCtx } from "#imports";

export const findMany = async (payload: {
  where?: prismaCtx.Prisma.FacultyWhereInput;
  orderBy?: prismaCtx.Prisma.FacultyOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<prismaCtx.Faculty[]> => {
  const prismaClient = usePrismaClient();

  const faculties: prismaCtx.Faculty[] = await prismaClient.faculty.findMany({
    where: payload.where,
    orderBy: payload.orderBy,
    skip: payload.skip,
    take: payload.take,
    include: {
      _count: {
        select: {
          students: true,
        },
      },
    },
  });

  return faculties;
};
