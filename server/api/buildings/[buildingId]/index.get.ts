import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { showBuildingEventHandlerFn } from '#server/features/buildings/building.show.handler';
import {
  BuildingParamsSchema,
  type ShowBuildingRequest,
} from '#shared/features/buildings';

export default defineEventHandler(
  new EventHandlerBuilder<ShowBuildingRequest>()
    .params(BuildingParamsSchema)
    .handle(showBuildingEventHandlerFn)
);
