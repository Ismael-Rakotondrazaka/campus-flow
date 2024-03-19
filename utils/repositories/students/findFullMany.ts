import { prismaCtx } from "#imports";

export const findFullMany = async (payload: {
  where?: prismaCtx.Prisma.StudentWhereInput;
  orderBy?: prismaCtx.Prisma.StudentOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<StudentFull[]> => {
  const prismaClient = usePrismaClient();

  const studentFullRaws: StudentFullRaw[] = await prismaClient.student.findMany(
    {
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
    },
  );

  const studentFulls: StudentFull[] = studentFullRaws.map(
    (studentFullRaw: StudentFullRaw) =>
      studentFullRawToStudentFull(studentFullRaw),
  );

  return studentFulls;
};
