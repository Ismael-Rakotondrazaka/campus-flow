import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { PresignAnnouncementIllustrationRequest } from '#shared/features/storage';

import { generateStorageKey } from '#server/core';
import { createS3UploadUrl, getS3PublicUrl } from '#server/utils/s3';
import { UpdateAnnouncementAbility } from '#shared/features/announcements/announcement.ability';
import { ANNOUNCEMENT_ILLUSTRATIONS_BUCKET } from '#shared/features/announcements/announcement.config';

export const presignAnnouncementIllustrationEventHandlerFn: EventHandlerFn<
  PresignAnnouncementIllustrationRequest
> = async ({ ability, body, params }) => {
  await ability.authorize(UpdateAnnouncementAbility);

  const uniqueName = generateStorageKey(body.fileName, body.contentType);
  const key = `${params.announcementId}/${uniqueName}`;

  const uploadUrl = await createS3UploadUrl(
    ANNOUNCEMENT_ILLUSTRATIONS_BUCKET,
    key,
    body.contentType
  );
  const publicUrl = getS3PublicUrl(ANNOUNCEMENT_ILLUSTRATIONS_BUCKET, key);

  return { publicUrl, uploadUrl };
};
