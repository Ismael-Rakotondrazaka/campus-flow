import type { Request } from '../../utils/request';
import type { PaginationResult } from '../paginations';
import type { Building } from './building.model';
import type { BuildingParams, BuildingQuery } from './building.schema';

export type IndexBuildingData = PaginationResult<Building>;
export type IndexBuildingRequest = Request<
  IndexBuildingData,
  Record<string, never>,
  Record<string, never>,
  BuildingQuery
>;

export type ShowBuildingData = { data: Building };
export type ShowBuildingRequest = Request<
  ShowBuildingData,
  Record<string, never>,
  BuildingParams
>;
