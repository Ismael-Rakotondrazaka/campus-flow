import { prismaCtx } from "#imports";

export const createOne = async ({
  data,
}: {
  data: prismaCtx.Prisma.FacultyCreateArgs["data"];
}): Promise<prismaCtx.Faculty> => {
  const prismaClient = usePrismaClient();

  const faculty: prismaCtx.Faculty = await prismaClient.faculty.create({
    data,
    include: {
      _count: {
        select: {
          students: true,
        },
      },
    },
  });

  return faculty;
};
