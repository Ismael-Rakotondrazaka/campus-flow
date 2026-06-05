import type { Request } from '../../utils/request';
import type { PaginationResult } from '../paginations';
import type { AcademicSession } from './academic-session.model';
import type {
  AcademicSessionParams,
  AcademicSessionQuery,
  CreateAcademicSession,
  UpdateAcademicSession,
} from './academic-session.schema';

export type DestroyAcademicSessionData = { data: AcademicSession };
export type DestroyAcademicSessionRequest = Request<
  DestroyAcademicSessionData,
  Record<string, never>,
  AcademicSessionParams
>;

export type IndexAcademicSessionData = PaginationResult<AcademicSession>;
export type IndexAcademicSessionRequest = Request<
  IndexAcademicSessionData,
  Record<string, never>,
  Record<string, never>,
  AcademicSessionQuery
>;

export type ShowAcademicSessionData = { data: AcademicSession };
export type ShowAcademicSessionRequest = Request<
  ShowAcademicSessionData,
  Record<string, never>,
  AcademicSessionParams
>;

export type StoreAcademicSessionData = { data: AcademicSession };
export type StoreAcademicSessionRequest = Request<
  StoreAcademicSessionData,
  CreateAcademicSession
>;

export type UpdateAcademicSessionData = { data: AcademicSession };
export type UpdateAcademicSessionRequest = Request<
  UpdateAcademicSessionData,
  UpdateAcademicSession,
  AcademicSessionParams
>;
