import type { Request } from '../../utils/request';
import type { PaginationResult } from '../paginations';
import type { Resident } from './resident.model';
import type {
  ResidentParams,
  ResidentQuery,
  UpdateResident,
} from './resident.schema';

export type DestroyResidentData = { data: Resident };
export type DestroyResidentRequest = Request<
  DestroyResidentData,
  Record<string, never>,
  ResidentParams
>;

export type IndexResidentData = PaginationResult<Resident>;
export type IndexResidentRequest = Request<
  IndexResidentData,
  Record<string, never>,
  Record<string, never>,
  ResidentQuery
>;

export type ShowResidentData = { data: Resident };
export type ShowResidentRequest = Request<
  ShowResidentData,
  Record<string, never>,
  ResidentParams
>;

export type UpdateResidentData = { data: Resident };
export type UpdateResidentRequest = Request<
  UpdateResidentData,
  UpdateResident,
  ResidentParams
>;
