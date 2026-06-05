import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { indexAcademicSessionEventHandlerFn } from '#server/features/academic-sessions/academic-session.index.handler';
import {
  AcademicSessionQuerySchema,
  type IndexAcademicSessionRequest,
} from '#shared/features/academic-sessions';

export default defineEventHandler(
  new EventHandlerBuilder<IndexAcademicSessionRequest>()
    .query(AcademicSessionQuerySchema)
    .handle(indexAcademicSessionEventHandlerFn)
);
