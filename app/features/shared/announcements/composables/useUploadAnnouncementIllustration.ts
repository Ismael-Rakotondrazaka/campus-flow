import { nanoid } from 'nanoid';
import slugify from 'slugify';

import { ANNOUNCEMENT_ILLUSTRATIONS_BUCKET } from '../announcement.config';

export const useUploadAnnouncementIllustration = () => {
  const upload = async (
    announcementId: string,
    file: File
  ): Promise<string> => {
    const client = useSupabaseClient();
    const lastDot = file.name.lastIndexOf('.');
    const baseName = lastDot > 0 ? file.name.slice(0, lastDot) : file.name;
    const ext = lastDot > 0 ? file.name.slice(lastDot) : '';
    const sanitizedName = slugify(baseName, { lower: true, strict: true });
    const uniqueId = nanoid();
    const uniqueName = `illustration__${sanitizedName}__${uniqueId}${ext}`;
    const path = `${announcementId}/${uniqueName}`;

    const { error } = await client.storage
      .from(ANNOUNCEMENT_ILLUSTRATIONS_BUCKET)
      .upload(path, file, { upsert: false });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = client.storage.from(ANNOUNCEMENT_ILLUSTRATIONS_BUCKET).getPublicUrl(path);

    return publicUrl;
  };

  return upload;
};
