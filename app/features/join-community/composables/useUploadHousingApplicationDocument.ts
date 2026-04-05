import { nanoid } from 'nanoid';
import slugify from 'slugify';

import { HOUSING_APPLICATION_DOCUMENTS_BUCKET } from '~/features/shared/housing-applications/housing-application.config';

type DocumentType = 'nic' | 'photo' | 'school-certificate';

export const useUploadHousingApplicationDocument = () => {
  const upload = async (
    applicationId: string,
    file: File,
    type: DocumentType
  ): Promise<string> => {
    const client = useSupabaseClient();
    const lastDot = file.name.lastIndexOf('.');
    const baseName = lastDot > 0 ? file.name.slice(0, lastDot) : file.name;
    const ext = lastDot > 0 ? file.name.slice(lastDot) : '';
    const sanitizedName = slugify(baseName, { lower: true, strict: true });
    const uniqueId = nanoid();
    const uniqueName = `${type}__${sanitizedName}__${uniqueId}${ext}`;
    const path = `${applicationId}/${uniqueName}`;

    const { error } = await client.storage
      .from(HOUSING_APPLICATION_DOCUMENTS_BUCKET)
      .upload(path, file, { upsert: false });

    if (error) throw error;

    return path;
  };

  return upload;
};
