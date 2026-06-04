import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import {
  AdminCountQuerySchema,
  countAdminEventHandlerFn,
  type CountAdminRequest,
} from '#server/features/admins/admin.count.handler';

export default defineEventHandler(
  new EventHandlerBuilder<CountAdminRequest>()
    .query(AdminCountQuerySchema)
    .handle(countAdminEventHandlerFn)
);
