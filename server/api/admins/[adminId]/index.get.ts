import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { showAdminEventHandlerFn } from '#server/features/admins/admin.show.handler';
import {
  AdminParamsSchema,
  type ShowAdminRequest,
} from '#shared/features/admins';

export default defineEventHandler(
  new EventHandlerBuilder<ShowAdminRequest>()
    .params(AdminParamsSchema)
    .handle(showAdminEventHandlerFn)
);
