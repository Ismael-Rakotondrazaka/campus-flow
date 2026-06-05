import type { H3Event$Fetch } from 'nitropack/types';

export const uploadUserAvatar = async (
  userId: string,
  file: File
): Promise<string> => {
  const { publicUrl, uploadUrl } = await $fetch<{
    publicUrl: string;
    uploadUrl: string;
  }>(`/api/storage/users/${userId}/avatar/presign`, {
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

export const getStorageSignedUrl = async (
  fetch: H3Event$Fetch | typeof $fetch,
  bucket: string,
  path: string
): Promise<string> => {
  const { url } = await fetch<{ url: string }>('/api/storage/signed-url', {
    query: { bucket, path },
  });
  return url;
};
