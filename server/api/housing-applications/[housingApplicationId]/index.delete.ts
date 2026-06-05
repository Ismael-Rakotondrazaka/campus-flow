import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { destroyHousingApplicationEventHandlerFn } from '#server/features/housing-applications/housing-application.destroy.handler';
import {
  type DestroyHousingApplicationRequest,
  HousingApplicationParamsSchema,
} from '#shared/features/housing-applications';

export default defineEventHandler(
  new EventHandlerBuilder<DestroyHousingApplicationRequest>()
    .params(HousingApplicationParamsSchema)
    .handle(destroyHousingApplicationEventHandlerFn)
);
