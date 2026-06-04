import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { showAcademicSessionEventHandlerFn } from '#server/features/academic-sessions/academic-session.show.handler';
import {
  AcademicSessionParamsSchema,
  type ShowAcademicSessionRequest,
} from '#shared/features/academic-sessions';

export default defineEventHandler(
  new EventHandlerBuilder<ShowAcademicSessionRequest>()
    .params(AcademicSessionParamsSchema)
    .handle(showAcademicSessionEventHandlerFn)
);
