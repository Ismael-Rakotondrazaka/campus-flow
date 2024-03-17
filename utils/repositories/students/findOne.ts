import { prismaCtx } from "#imports";

export const findOne = async ({
  where,
  orderBy,
  skip,
  take,
}: {
  where?: prismaCtx.Prisma.StudentWhereInput;
  orderBy?: prismaCtx.Prisma.StudentOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<prismaCtx.Student | null> => {
  const prismaClient = usePrismaClient();

  const user: prismaCtx.Student | null = await prismaClient.student.findFirst({
    where,
    orderBy,
    skip,
    take,
  });

  return user;
};
