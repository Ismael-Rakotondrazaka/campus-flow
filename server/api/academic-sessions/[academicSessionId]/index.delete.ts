import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { destroyAcademicSessionEventHandlerFn } from '#server/features/academic-sessions/academic-session.destroy.handler';
import {
  AcademicSessionParamsSchema,
  type DestroyAcademicSessionRequest,
} from '#shared/features/academic-sessions';

export default defineEventHandler(
  new EventHandlerBuilder<DestroyAcademicSessionRequest>()
    .params(AcademicSessionParamsSchema)
    .handle(destroyAcademicSessionEventHandlerFn)
);
