import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { storeAcademicSessionEventHandlerFn } from '#server/features/academic-sessions/academic-session.store.handler';
import {
  CreateAcademicSessionSchema,
  type StoreAcademicSessionRequest,
} from '#shared/features/academic-sessions';

export default defineEventHandler(
  new EventHandlerBuilder<StoreAcademicSessionRequest>()
    .body(CreateAcademicSessionSchema)
    .handle(storeAcademicSessionEventHandlerFn)
);
