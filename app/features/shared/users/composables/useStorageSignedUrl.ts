import { defineQueryOptions } from '@pinia/colada';

import { getStorageSignedUrl } from '../user.service';

export const storageSignedUrlQuery = defineQueryOptions(
  ({ bucket, path }: { bucket: string; path: string }) => {
    const fetch = useRequestFetch();
    return {
      key: ['storage-signed-url', bucket, path],
      query: () => getStorageSignedUrl(fetch, bucket, path),
      staleTime: 55 * 60 * 1000, // 55 min - refresh before the 1h URL expires
    };
  }
);
