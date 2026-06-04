import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { PresignHousingApplicationDocumentRequest } from '#shared/features/storage';

import { generateStorageKey } from '#server/core';
import { createS3UploadUrl } from '#server/utils/s3';
import { StoreHousingApplicationAbility } from '#shared/features/housing-applications/housing-application.ability';
import { HOUSING_APPLICATION_DOCUMENTS_BUCKET } from '#shared/features/housing-applications/housing-application.config';

export const presignHousingApplicationDocumentEventHandlerFn: EventHandlerFn<
  PresignHousingApplicationDocumentRequest
> = async ({ ability, body, params }) => {
  const session = await getActiveApplicationSession();

  if (session === null) {
    throw Exception.notFound({ data: {} });
  }

  await ability.authorize(StoreHousingApplicationAbility, session);

  const uniqueName = generateStorageKey(body.fileName, body.contentType);
  const key = `${params.applicationId}/${params.type}--${uniqueName}`;

  const uploadUrl = await createS3UploadUrl(
    HOUSING_APPLICATION_DOCUMENTS_BUCKET,
    key,
    body.contentType
  );

  return { path: key, uploadUrl };
};
