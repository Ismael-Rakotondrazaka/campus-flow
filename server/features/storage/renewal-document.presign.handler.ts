import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { PresignRenewalDocumentRequest } from '#shared/features/storage';

import { generateStorageKey } from '#server/core';
import { createS3UploadUrl } from '#server/utils/s3';
import { IndexRenewalAbility } from '#shared/features/renewals/renewal.ability';
import { RENEWAL_DOCUMENTS_BUCKET } from '#shared/features/renewals/renewal.config';

export const presignRenewalDocumentEventHandlerFn: EventHandlerFn<
  PresignRenewalDocumentRequest
> = async ({ ability, body, params }) => {
  await ability.authorize(IndexRenewalAbility);

  const uniqueName = generateStorageKey(body.fileName, body.contentType);
  const key = `${params.folderId}/${params.type}--${uniqueName}`;

  const uploadUrl = await createS3UploadUrl(
    RENEWAL_DOCUMENTS_BUCKET,
    key,
    body.contentType
  );

  return { path: key, uploadUrl };
};
