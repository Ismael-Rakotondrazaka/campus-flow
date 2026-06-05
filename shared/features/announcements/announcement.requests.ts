import type { Request } from '../../utils/request';
import type { PaginationResult } from '../paginations';
import type { Announcement } from './announcement.model';
import type {
  AnnouncementParams,
  AnnouncementQuery,
  CreateAnnouncement,
  UpdateAnnouncement,
} from './announcement.schema';

export type DestroyAnnouncementData = { data: Announcement };
export type DestroyAnnouncementRequest = Request<
  DestroyAnnouncementData,
  Record<string, never>,
  AnnouncementParams
>;

export type IndexAnnouncementData = PaginationResult<Announcement>;
export type IndexAnnouncementRequest = Request<
  IndexAnnouncementData,
  Record<string, never>,
  Record<string, never>,
  AnnouncementQuery
>;

export type ShowAnnouncementData = { data: Announcement };
export type ShowAnnouncementRequest = Request<
  ShowAnnouncementData,
  Record<string, never>,
  AnnouncementParams
>;

export type StoreAnnouncementData = { data: Announcement };
export type StoreAnnouncementRequest = Request<
  StoreAnnouncementData,
  CreateAnnouncement
>;

export type UpdateAnnouncementData = { data: Announcement };
export type UpdateAnnouncementRequest = Request<
  UpdateAnnouncementData,
  UpdateAnnouncement,
  AnnouncementParams
>;
