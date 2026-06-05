import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import {
  activeAcademicSessionEventHandlerFn,
  type ActiveAcademicSessionRequest,
} from '#server/features/academic-sessions/academic-session.active.handler';

export default defineEventHandler(
  new EventHandlerBuilder<ActiveAcademicSessionRequest>().handle(
    activeAcademicSessionEventHandlerFn
  )
);
