import { prismaCtx } from "#imports";
import { findOne } from "./findOne";

export const findOneOrFail = async (payload: {
  where?: prismaCtx.Prisma.FacultyWhereInput;
  orderBy?: prismaCtx.Prisma.FacultyOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<prismaCtx.Faculty> => {
  const faculty: prismaCtx.Faculty | null = await findOne({
    where: payload.where,
    orderBy: payload.orderBy,
    skip: payload.skip,
    take: payload.take,
  });

  if (is.null(faculty)) {
    throw createNotFoundError();
  }

  return faculty;
};
