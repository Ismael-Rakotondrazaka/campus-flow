import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import {
  countAcademicSessionEventHandlerFn,
  type CountAcademicSessionRequest,
} from '#server/features/academic-sessions/academic-session.count.handler';

export default defineEventHandler(
  new EventHandlerBuilder<CountAcademicSessionRequest>().handle(
    countAcademicSessionEventHandlerFn
  )
);
