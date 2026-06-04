import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { indexBuildingEventHandlerFn } from '#server/features/buildings/building.index.handler';
import {
  BuildingQuerySchema,
  type IndexBuildingRequest,
} from '#shared/features/buildings';

export default defineEventHandler(
  new EventHandlerBuilder<IndexBuildingRequest>()
    .query(BuildingQuerySchema)
    .handle(indexBuildingEventHandlerFn)
);
