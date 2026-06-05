import type { Request } from '../../utils/request';
import type { PaginationResult } from '../paginations';
import type { Admin } from './admin.model';
import type { AdminParams, AdminQuery, UpdateAdmin } from './admin.schema';

export type DestroyAdminData = { data: Admin };
export type DestroyAdminRequest = Request<
  DestroyAdminData,
  Record<string, never>,
  AdminParams
>;

export type IndexAdminData = PaginationResult<Admin>;
export type IndexAdminRequest = Request<
  IndexAdminData,
  Record<string, never>,
  Record<string, never>,
  AdminQuery
>;

export type ShowAdminData = { data: Admin };
export type ShowAdminRequest = Request<
  ShowAdminData,
  Record<string, never>,
  AdminParams
>;

export type UpdateAdminData = { data: Admin };
export type UpdateAdminRequest = Request<
  UpdateAdminData,
  UpdateAdmin,
  AdminParams
>;
