import { defineQueryOptions } from '@pinia/colada';

const SIGNED_URL_EXPIRES_IN = 60 * 60; // 1 hour

const getSignedUrl = async (
  bucket: string,
  path: string
): Promise<string> => {
  const client = useSupabaseClient();

  const { data, error } = await client.storage
    .from(bucket)
    .createSignedUrl(path, SIGNED_URL_EXPIRES_IN);

  if (error) throw error;

  return data.signedUrl;
};

export const storageSignedUrlQuery = defineQueryOptions(
  ({ bucket, path }: { bucket: string; path: string }) => ({
    key: ['storage-signed-url', bucket, path],
    query: () => getSignedUrl(bucket, path),
    staleTime: 55 * 60 * 1000, // 55 min — refresh before the 1h URL expires
  })
);
