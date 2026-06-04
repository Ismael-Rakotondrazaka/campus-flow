import type {
  AnnouncementQuery,
  CreateAnnouncement,
  UpdateAnnouncement,
} from '#shared/features/announcements';
import type { H3Event$Fetch } from 'nitropack/types';

export const getAnnouncements = async (
  filters: AnnouncementQuery,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  return fetchFn('/api/announcements', {
    query: filters,
  });
};

export const getAnnouncementsCount = async (
  filters: Omit<AnnouncementQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'>,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { count } = await fetchFn('/api/announcements/count', {
    query: filters,
  });
  return count;
};

export const getAnnouncement = async (
  announcementId: string,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn(
    `/api/announcements/${announcementId}` as '/api/announcements/${announcementId}'
  );
  return data;
};

export const createAnnouncement = async (
  input: CreateAnnouncement,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn('/api/announcements', {
    body: input,
    method: 'POST',
  });
  return data;
};

export const updateAnnouncement = async (
  announcementId: string,
  input: UpdateAnnouncement,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn(
    `/api/announcements/${announcementId}` as '/api/announcements/${announcementId}',
    {
      body: input,
      method: 'PUT',
    }
  );
  return data;
};

export const deleteAnnouncement = async (
  announcementId: string,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  await fetchFn(
    `/api/announcements/${announcementId}` as '/api/announcements/${announcementId}',
    {
      method: 'DELETE',
    }
  );
};

export const uploadAnnouncementIllustration = async (
  announcementId: string,
  file: File
): Promise<string> => {
  const { publicUrl, uploadUrl } = await $fetch<{
    publicUrl: string;
    uploadUrl: string;
  }>(`/api/storage/announcements/${announcementId}/illustration/presign`, {
    body: { contentType: file.type, fileName: file.name },
    method: 'POST',
  });

  await fetch(uploadUrl, {
    body: file,
    headers: { 'Content-Type': file.type },
    method: 'PUT',
  });

  return publicUrl;
};
