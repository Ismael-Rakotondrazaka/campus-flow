import { prismaCtx } from "#imports";
import { findFullOne } from "./findFullOne";

export const findFullOneOrFail = async (payload: {
  where?: prismaCtx.Prisma.StudentWhereInput;
  orderBy?: prismaCtx.Prisma.StudentOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<StudentFull> => {
  const student: StudentFull | null = await findFullOne({
    where: payload.where,
    orderBy: payload.orderBy,
    skip: payload.skip,
    take: payload.take,
  });

  if (is.null(student)) {
    throw createNotFoundError();
  }

  return student;
};
