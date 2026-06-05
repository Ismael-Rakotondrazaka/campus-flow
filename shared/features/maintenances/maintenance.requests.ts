import type { Request } from '../../utils/request';
import type { PaginationResult } from '../paginations';
import type { Maintenance } from './maintenance.model';
import type {
  CreateMaintenance,
  MaintenanceCountQuery,
  MaintenanceParams,
  MaintenanceQuery,
  UpdateMaintenance,
} from './maintenance.schema';

export type CountMaintenanceRequest = Request<
  { count: number },
  Record<string, never>,
  Record<string, never>,
  MaintenanceCountQuery
>;

export type DestroyMaintenanceData = { data: Maintenance };
export type DestroyMaintenanceRequest = Request<
  DestroyMaintenanceData,
  Record<string, never>,
  MaintenanceParams
>;

export type IndexMaintenanceData = PaginationResult<Maintenance>;
export type IndexMaintenanceRequest = Request<
  IndexMaintenanceData,
  Record<string, never>,
  Record<string, never>,
  MaintenanceQuery
>;

export type ShowMaintenanceData = { data: Maintenance };
export type ShowMaintenanceRequest = Request<
  ShowMaintenanceData,
  Record<string, never>,
  MaintenanceParams
>;

export type StoreMaintenanceData = { data: Maintenance };
export type StoreMaintenanceRequest = Request<
  StoreMaintenanceData,
  CreateMaintenance
>;

export type UpdateMaintenanceData = { data: Maintenance };
export type UpdateMaintenanceRequest = Request<
  UpdateMaintenanceData,
  UpdateMaintenance,
  MaintenanceParams
>;
