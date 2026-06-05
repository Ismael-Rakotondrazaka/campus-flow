import type { Request } from '../../utils/request';
import type { PaginationResult } from '../paginations';
import type { HousingApplication } from './housing-application.model';
import type {
  CreateHousingApplication,
  HousingApplicationParams,
  HousingApplicationQuery,
  UpdateHousingApplication,
} from './housing-application.schema';

export type DestroyHousingApplicationData = { data: HousingApplication };
export type DestroyHousingApplicationRequest = Request<
  DestroyHousingApplicationData,
  Record<string, never>,
  HousingApplicationParams
>;

export type IndexHousingApplicationData = PaginationResult<HousingApplication>;
export type IndexHousingApplicationRequest = Request<
  IndexHousingApplicationData,
  Record<string, never>,
  Record<string, never>,
  HousingApplicationQuery
>;

export type ShowHousingApplicationData = { data: HousingApplication };
export type ShowHousingApplicationRequest = Request<
  ShowHousingApplicationData,
  Record<string, never>,
  HousingApplicationParams
>;

export type StoreHousingApplicationData = { data: HousingApplication };
export type StoreHousingApplicationRequest = Request<
  StoreHousingApplicationData,
  CreateHousingApplication
>;

export type UpdateHousingApplicationData = { data: HousingApplication };
export type UpdateHousingApplicationRequest = Request<
  UpdateHousingApplicationData,
  UpdateHousingApplication,
  HousingApplicationParams
>;
