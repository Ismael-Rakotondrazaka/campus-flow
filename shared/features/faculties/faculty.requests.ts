import type { Request } from '../../utils/request';
import type { PaginationResult } from '../paginations';
import type { Faculty } from './faculty.model';
import type { FacultyParams, FacultyQuery } from './faculty.schema';

export type IndexFacultyData = PaginationResult<Faculty>;
export type IndexFacultyRequest = Request<
  IndexFacultyData,
  Record<string, never>,
  Record<string, never>,
  FacultyQuery
>;

export type ShowFacultyData = { data: Faculty };
export type ShowFacultyRequest = Request<
  ShowFacultyData,
  Record<string, never>,
  FacultyParams
>;
