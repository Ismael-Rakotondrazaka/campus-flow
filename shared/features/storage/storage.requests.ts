import type { Request } from '../../utils/request';
import type {
  AnnouncementIllustrationParams,
  HousingApplicationDocumentParams,
  PresignBody,
  PresignDocumentBody,
  RenewalDocumentParams,
  SignedUrlQuery,
  UserAvatarParams,
} from './storage.schema';

export type GetSignedUrlData = { url: string };
export type GetSignedUrlRequest = Request<
  GetSignedUrlData,
  Record<string, never>,
  Record<string, never>,
  SignedUrlQuery
>;

export type PresignAnnouncementIllustrationData = {
  publicUrl: string;
  uploadUrl: string;
};
export type PresignAnnouncementIllustrationRequest = Request<
  PresignAnnouncementIllustrationData,
  PresignBody,
  AnnouncementIllustrationParams
>;

export type PresignHousingApplicationDocumentData = {
  path: string;
  uploadUrl: string;
};
export type PresignHousingApplicationDocumentRequest = Request<
  PresignHousingApplicationDocumentData,
  PresignDocumentBody,
  HousingApplicationDocumentParams
>;

export type PresignRenewalDocumentData = { path: string; uploadUrl: string };
export type PresignRenewalDocumentRequest = Request<
  PresignRenewalDocumentData,
  PresignDocumentBody,
  RenewalDocumentParams
>;

export type PresignUserAvatarData = { publicUrl: string; uploadUrl: string };
export type PresignUserAvatarRequest = Request<
  PresignUserAvatarData,
  PresignBody,
  UserAvatarParams
>;
