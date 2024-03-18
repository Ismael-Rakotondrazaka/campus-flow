import { prismaCtx } from "#imports";
import { findFullOne } from "./findFullOne";

export const findFullOneOrFail = async ({
  where,
  orderBy,
  skip,
  take,
}: {
  where?: prismaCtx.Prisma.BuildingWhereInput;
  orderBy?: prismaCtx.Prisma.BuildingOrderByWithRelationInput;
  skip?: number;
  take?: number;
}): Promise<BuildingFull> => {
  const building: BuildingFull | null = await findFullOne({
    where,
    orderBy,
    skip,
    take,
  });

  if (is.null(building)) {
    throw createNotFoundError();
  }

  return building;
};
