import { prismaCtx } from "#imports";

export const findFullOne = async (payload: {
  where?: prismaCtx.Prisma.StudentWhereInput;
  orderBy?: prismaCtx.Prisma.StudentOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<StudentFull | null> => {
  const prismaClient = usePrismaClient();

  const refreshTokenRaw: StudentFullRaw | null =
    await prismaClient.student.findFirst({
      where: payload.where,
      orderBy: payload.orderBy,
      skip: payload.skip,
      take: payload.take,
      include: {
        user: true,
        faculty: true,
        lodgment: {
          include: {
            building: true,
            _count: {
              select: {
                students: true,
              },
            },
          },
        },
        _count: {
          select: {
            renewals: true,
          },
        },
      },
    });

  if (is.null(refreshTokenRaw)) {
    return null;
  }

  return studentFullRawToStudentFull(refreshTokenRaw);
};
