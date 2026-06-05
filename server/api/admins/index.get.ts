import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { indexAdminEventHandlerFn } from '#server/features/admins/admin.index.handler';
import {
  AdminQuerySchema,
  type IndexAdminRequest,
} from '#shared/features/admins';

export default defineEventHandler(
  new EventHandlerBuilder<IndexAdminRequest>()
    .query(AdminQuerySchema)
    .handle(indexAdminEventHandlerFn)
);
