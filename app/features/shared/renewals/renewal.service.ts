import type {
  CreateRenewal,
  RenewalQuery,
  UpdateRenewal,
} from '#shared/features/renewals';
import type { H3Event$Fetch } from 'nitropack/types';

export const getRenewals = async (
  filters: RenewalQuery,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  return fetchFn('/api/renewals', {
    query: filters,
  });
};

export const getRenewalsCount = async (
  filters: Omit<RenewalQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'>,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { count } = await fetchFn('/api/renewals/count', {
    query: filters,
  });
  return count;
};

export const getRenewal = async (
  renewalId: string,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn(
    `/api/renewals/${renewalId}` as '/api/renewals/${renewalId}'
  );
  return data;
};

export const createRenewal = async (
  input: CreateRenewal,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn('/api/renewals', {
    body: input,
    method: 'POST',
  });
  return data;
};

export const updateRenewal = async (
  renewalId: string,
  input: UpdateRenewal,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn(
    `/api/renewals/${renewalId}` as '/api/renewals/${renewalId}',
    {
      body: input,
      method: 'PUT',
    }
  );
  return data;
};

type RenewalDocumentType = 'nic' | 'photo' | 'school-certificate';

export const uploadRenewalDocument = async (
  folderId: string,
  file: File,
  type: RenewalDocumentType
): Promise<string> => {
  const { path, uploadUrl } = await $fetch<{
    path: string;
    uploadUrl: string;
  }>(
    `/api/storage/renewals/${folderId}/documents/${type}/presign` as '/api/storage/renewals/${folderId}/documents/${type}/presign',
    {
      body: { contentType: file.type, fileName: file.name },
      method: 'POST',
    }
  );

  const response = await fetch(uploadUrl, {
    body: file,
    headers: { 'Content-Type': file.type },
    method: 'PUT',
  });

  if (!response.ok) {
    throw new Error(`Upload échoué: ${response.status}`);
  }

  return path;
};

export const deleteRenewal = async (
  renewalId: string,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  await fetchFn(`/api/renewals/${renewalId}` as '/api/renewals/${renewalId}', {
    method: 'DELETE',
  });
};
