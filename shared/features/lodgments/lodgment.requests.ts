import type { Request } from '../../utils/request';
import type { PaginationResult } from '../paginations';
import type { Lodgment } from './lodgment.model';
import type { LodgmentParams, LodgmentQuery } from './lodgment.schema';

export type IndexLodgmentData = PaginationResult<Lodgment>;
export type IndexLodgmentRequest = Request<
  IndexLodgmentData,
  Record<string, never>,
  Record<string, never>,
  LodgmentQuery
>;

export type ShowLodgmentData = { data: Lodgment };
export type ShowLodgmentRequest = Request<
  ShowLodgmentData,
  Record<string, never>,
  LodgmentParams
>;
