import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { destroyAdminEventHandlerFn } from '#server/features/admins/admin.destroy.handler';
import {
  AdminParamsSchema,
  type DestroyAdminRequest,
} from '#shared/features/admins';

export default defineEventHandler(
  new EventHandlerBuilder<DestroyAdminRequest>()
    .params(AdminParamsSchema)
    .handle(destroyAdminEventHandlerFn)
);
