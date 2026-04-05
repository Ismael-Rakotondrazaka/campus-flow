import { HOUSING_APPLICATION_DOCUMENTS_BUCKET } from '../housing-application.config';

const SIGNED_URL_EXPIRES_IN = 60 * 60; // 1 hour

export const useHousingApplicationSignedUrl = () => {
  const client = useSupabaseClient();

  const getSignedUrl = async (path: string): Promise<string> => {
    const { data, error } = await client.storage
      .from(HOUSING_APPLICATION_DOCUMENTS_BUCKET)
      .createSignedUrl(path, SIGNED_URL_EXPIRES_IN);

    if (error) throw error;

    return data.signedUrl;
  };

  return { getSignedUrl };
};
