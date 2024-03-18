import { z, prismaCtx } from "#imports";
import { Simplify } from "type-fest";
import {
  BuildingOrderByWithRelationInputSchema,
  BuildingWhereInputSchema,
} from "~/prisma/generated/zod";

/* -------------------------------------------------------------------------- */
/*                             IndexBuilding query                             */
/* -------------------------------------------------------------------------- */

export type IndexBuildingQuery = Simplify<
  {
    where?: prismaCtx.Prisma.BuildingWhereInput;
    orderBy?: prismaCtx.Prisma.BuildingOrderByWithRelationInput;
  } & PaginationQuery
>;

// ! we this type on client-side
export type IndexBuildingQueryInput = Partial<IndexBuildingQuery>;

export const IndexBuildingQuerySchema: z.ZodType<
  IndexBuildingQuery,
  z.ZodTypeDef,
  IndexBuildingQueryInput
> = z
  .object({
    where: BuildingWhereInputSchema,
    orderBy: BuildingOrderByWithRelationInputSchema,
  })
  .partial()
  .and(makePaginationQuery(buildingConfig.PAGE_SIZE_DEFAULT_VALUE));

/* -------------------------------------------------------------------------- */
/*                             IndexBuilding data                             */
/* -------------------------------------------------------------------------- */

export type IndexBuildingData = Simplify<
  {
    buildings: BuildingFull[];
  } & Pagination
>;

export const IndexBuildingDataSchema: z.ZodType<IndexBuildingData> = z
  .object({
    buildings: z.array(BuildingFullSchema),
  })
  .and(PaginationSchema);

/* -------------------------------------------------------------------------- */
/*                             IndexBuilding error                            */
/* -------------------------------------------------------------------------- */

export type IndexBuildingQueryPEM = RequestErrorMessage<IndexBuildingQuery>;

export type IndexBuildingError = RequestError<IndexBuildingQueryPEM>;

export type IndexBuildingResponse = RequestResponse<
  IndexBuildingData,
  IndexBuildingQuery
>;
