import type { Request } from '../../utils/request';
import type { PaginationResult } from '../paginations';
import type { Maintainer } from './maintainer.model';
import type {
  CreateMaintainer,
  MaintainerParams,
  MaintainerQuery,
  UpdateMaintainer,
} from './maintainer.schema';

export type DestroyMaintainerData = { data: Maintainer };
export type DestroyMaintainerRequest = Request<
  DestroyMaintainerData,
  Record<string, never>,
  MaintainerParams
>;

export type IndexMaintainerData = PaginationResult<Maintainer>;
export type IndexMaintainerRequest = Request<
  IndexMaintainerData,
  Record<string, never>,
  Record<string, never>,
  MaintainerQuery
>;

export type ShowMaintainerData = { data: Maintainer };
export type ShowMaintainerRequest = Request<
  ShowMaintainerData,
  Record<string, never>,
  MaintainerParams
>;

export type StoreMaintainerData = { data: Maintainer };
export type StoreMaintainerRequest = Request<
  StoreMaintainerData,
  CreateMaintainer
>;

export type UpdateMaintainerData = { data: Maintainer };
export type UpdateMaintainerRequest = Request<
  UpdateMaintainerData,
  UpdateMaintainer,
  MaintainerParams
>;
