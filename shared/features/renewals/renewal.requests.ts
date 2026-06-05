import type { Request } from '../../utils/request';
import type { PaginationResult } from '../paginations';
import type { Renewal } from './renewal.model';
import type {
  CreateRenewal,
  RenewalParams,
  RenewalQuery,
  UpdateRenewal,
} from './renewal.schema';

export type DestroyRenewalData = { data: Renewal };
export type DestroyRenewalRequest = Request<
  DestroyRenewalData,
  Record<string, never>,
  RenewalParams
>;

export type IndexRenewalData = PaginationResult<Renewal>;
export type IndexRenewalRequest = Request<
  IndexRenewalData,
  Record<string, never>,
  Record<string, never>,
  RenewalQuery
>;

export type ShowRenewalData = { data: Renewal };
export type ShowRenewalRequest = Request<
  ShowRenewalData,
  Record<string, never>,
  RenewalParams
>;

export type StoreRenewalData = { data: Renewal };
export type StoreRenewalRequest = Request<StoreRenewalData, CreateRenewal>;

export type UpdateRenewalData = { data: Renewal };
export type UpdateRenewalRequest = Request<
  UpdateRenewalData,
  UpdateRenewal,
  RenewalParams
>;
