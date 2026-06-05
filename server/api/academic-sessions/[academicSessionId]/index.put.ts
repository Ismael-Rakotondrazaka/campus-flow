import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { updateAcademicSessionEventHandlerFn } from '#server/features/academic-sessions/academic-session.update.handler';
import {
  AcademicSessionParamsSchema,
  type UpdateAcademicSessionRequest,
  UpdateAcademicSessionSchema,
} from '#shared/features/academic-sessions';

export default defineEventHandler(
  new EventHandlerBuilder<UpdateAcademicSessionRequest>()
    .body(UpdateAcademicSessionSchema)
    .params(AcademicSessionParamsSchema)
    .handle(updateAcademicSessionEventHandlerFn)
);
