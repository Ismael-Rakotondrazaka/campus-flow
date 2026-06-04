import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import {
  countResidentEventHandlerFn,
  type CountResidentRequest,
  ResidentCountQuerySchema,
} from '#server/features/residents/resident.count.handler';

export default defineEventHandler(
  new EventHandlerBuilder<CountResidentRequest>()
    .query(ResidentCountQuerySchema)
    .handle(countResidentEventHandlerFn)
);
