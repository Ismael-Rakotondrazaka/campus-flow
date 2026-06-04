import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { destroyResidentEventHandlerFn } from '#server/features/residents/resident.destroy.handler';
import {
  type DestroyResidentRequest,
  ResidentParamsSchema,
} from '#shared/features/residents';

export default defineEventHandler(
  new EventHandlerBuilder<DestroyResidentRequest>()
    .params(ResidentParamsSchema)
    .handle(destroyResidentEventHandlerFn)
);
