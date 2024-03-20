import { prismaCtx } from "#imports";
import { findFullOne } from "./findFullOne";

export const findFullOneOrFail = async ({
  where,
  orderBy,
  skip,
  take,
}: {
  where?: prismaCtx.Prisma.LodgmentWhereInput;
  orderBy?: prismaCtx.Prisma.LodgmentOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<LodgmentFull> => {
  const lodgment: LodgmentFull | null = await findFullOne({
    where,
    orderBy,
    skip,
    take,
  });

  if (is.null(lodgment)) {
    throw createNotFoundError();
  }

  return lodgment;
};
