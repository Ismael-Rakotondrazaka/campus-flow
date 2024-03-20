import { z, prismaCtx } from "#imports";
import { Simplify } from "type-fest";
import {
  MaintenanceOrderByWithRelationInputSchema,
  MaintenanceWhereInputSchema,
} from "~/prisma/generated/zod";

/* -------------------------------------------------------------------------- */
/*                             IndexMaintenance query                             */
/* -------------------------------------------------------------------------- */

export type IndexMaintenanceQuery = Simplify<
  {
    where?: prismaCtx.Prisma.MaintenanceWhereInput;
    orderBy?: prismaCtx.Prisma.MaintenanceOrderByWithRelationInput;
  } & PaginationQuery
>;

// ! we this type on client-side
export type IndexMaintenanceQueryInput = Partial<IndexMaintenanceQuery>;

export const IndexMaintenanceQuerySchema: z.ZodType<
  IndexMaintenanceQuery,
  z.ZodTypeDef,
  IndexMaintenanceQueryInput
> = z
  .object({
    where: MaintenanceWhereInputSchema,
    orderBy: MaintenanceOrderByWithRelationInputSchema,
  })
  .partial()
  .and(makePaginationQuery(maintenanceConfig.PAGE_SIZE_DEFAULT_VALUE));

/* -------------------------------------------------------------------------- */
/*                             IndexMaintenance data                             */
/* -------------------------------------------------------------------------- */

export type IndexMaintenanceData = Simplify<
  {
    maintenances: MaintenanceFull[];
  } & Pagination
>;

export const IndexMaintenanceDataSchema: z.ZodType<IndexMaintenanceData> = z
  .object({
    maintenances: z.array(MaintenanceFullSchema),
  })
  .and(PaginationSchema);

/* -------------------------------------------------------------------------- */
/*                             IndexMaintenance error                            */
/* -------------------------------------------------------------------------- */

export type IndexMaintenanceQueryPEM =
  RequestErrorMessage<IndexMaintenanceQuery>;

export type IndexMaintenanceError = RequestError<IndexMaintenanceQueryPEM>;

export type IndexMaintenanceResponse = RequestResponse<
  IndexMaintenanceData,
  IndexMaintenanceQuery
>;
