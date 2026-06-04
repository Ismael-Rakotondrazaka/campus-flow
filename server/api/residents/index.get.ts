import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { indexResidentEventHandlerFn } from '#server/features/residents/resident.index.handler';
import {
  type IndexResidentRequest,
  ResidentQuerySchema,
} from '#shared/features/residents';

export default defineEventHandler(
  new EventHandlerBuilder<IndexResidentRequest>()
    .query(ResidentQuerySchema)
    .handle(indexResidentEventHandlerFn)
);
