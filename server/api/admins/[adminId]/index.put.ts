import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { updateAdminEventHandlerFn } from '#server/features/admins/admin.update.handler';
import {
  AdminParamsSchema,
  type UpdateAdminRequest,
  UpdateAdminSchema,
} from '#shared/features/admins';

export default defineEventHandler(
  new EventHandlerBuilder<UpdateAdminRequest>()
    .body(UpdateAdminSchema)
    .params(AdminParamsSchema)
    .handle(updateAdminEventHandlerFn)
);
