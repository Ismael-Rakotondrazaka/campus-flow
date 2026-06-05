import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import {
  BuildingCountQuerySchema,
  countBuildingEventHandlerFn,
  type CountBuildingRequest,
} from '#server/features/buildings/building.count.handler';

export default defineEventHandler(
  new EventHandlerBuilder<CountBuildingRequest>()
    .query(BuildingCountQuerySchema)
    .handle(countBuildingEventHandlerFn)
);
