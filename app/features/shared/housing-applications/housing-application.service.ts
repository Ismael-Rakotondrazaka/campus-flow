import type {
  CreateHousingApplication,
  HousingApplicationQuery,
  UpdateHousingApplication,
} from '#shared/features/housing-applications';
import type { H3Event$Fetch } from 'nitropack/types';

export const getHousingApplications = async (
  filters: HousingApplicationQuery,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  return fetchFn('/api/housing-applications', { query: filters });
};

export const getHousingApplicationsCount = async (
  filters: Omit<HousingApplicationQuery, 'limit' | 'page' | 'sortOrder'>,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { count } = await fetchFn('/api/housing-applications/count', {
    query: filters,
  });
  return count;
};

export const getHousingApplication = async (
  housingApplicationId: string,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn(
    `/api/housing-applications/${housingApplicationId}` as '/api/housing-applications/${housingApplicationId}'
  );
  return data;
};

export const createHousingApplication = async (
  input: CreateHousingApplication,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn('/api/housing-applications', {
    body: input,
    method: 'POST',
  });
  return data;
};

export const updateHousingApplication = async (
  housingApplicationId: string,
  input: UpdateHousingApplication,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  const { data } = await fetchFn(
    `/api/housing-applications/${housingApplicationId}` as '/api/housing-applications/${housingApplicationId}',
    {
      body: input,
      method: 'PUT',
    }
  );
  return data;
};

export const deleteHousingApplication = async (
  housingApplicationId: string,
  fetchFn: H3Event$Fetch | typeof $fetch = $fetch
) => {
  await fetchFn(
    `/api/housing-applications/${housingApplicationId}` as '/api/housing-applications/${housingApplicationId}',
    { method: 'DELETE' }
  );
};

type DocumentType = 'nic' | 'photo' | 'school-certificate';

export const uploadHousingApplicationDocument = async (
  applicationId: string,
  file: File,
  type: DocumentType
): Promise<string> => {
  const { path, uploadUrl } = await $fetch<{
    path: string;
    uploadUrl: string;
  }>(
    `/api/storage/housing-applications/${applicationId}/documents/${type}/presign`,
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
    throw new Error(`Upload failed: ${response.status}`);
  }

  return path;
};
