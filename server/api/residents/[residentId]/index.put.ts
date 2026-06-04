import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { updateResidentEventHandlerFn } from '#server/features/residents/resident.update.handler';
import {
  ResidentParamsSchema,
  type UpdateResidentRequest,
  UpdateResidentSchema,
} from '#shared/features/residents';

export default defineEventHandler(
  new EventHandlerBuilder<UpdateResidentRequest>()
    .body(UpdateResidentSchema)
    .params(ResidentParamsSchema)
    .handle(updateResidentEventHandlerFn)
);
