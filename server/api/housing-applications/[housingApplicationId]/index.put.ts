import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { updateHousingApplicationEventHandlerFn } from '#server/features/housing-applications/housing-application.update.handler';
import {
  HousingApplicationParamsSchema,
  type UpdateHousingApplicationRequest,
  UpdateHousingApplicationSchema,
} from '#shared/features/housing-applications';

export default defineEventHandler(
  new EventHandlerBuilder<UpdateHousingApplicationRequest>()
    .body(UpdateHousingApplicationSchema)
    .params(HousingApplicationParamsSchema)
    .handle(updateHousingApplicationEventHandlerFn)
);
