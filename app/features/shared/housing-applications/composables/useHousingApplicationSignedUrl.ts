import { defineQueryOptions } from '@pinia/colada';

import { HOUSING_APPLICATION_DOCUMENTS_BUCKET } from '../housing-application.config';

const SIGNED_URL_EXPIRES_IN = 60 * 60; // 1 hour

const getSignedUrl = async (path: string): Promise<string> => {
  const client = useSupabaseClient();

  const { data, error } = await client.storage
    .from(HOUSING_APPLICATION_DOCUMENTS_BUCKET)
    .createSignedUrl(path, SIGNED_URL_EXPIRES_IN);

  if (error) throw error;

  return data.signedUrl;
};

export const housingApplicationSignedUrlQuery = defineQueryOptions(
  (path: string) => ({
    key: ['housing-application-documents', 'signed-url', path],
    query: () => getSignedUrl(path),
    staleTime: 55 * 60 * 1000, // 55 min — refresh before the 1h URL expires
  })
);
