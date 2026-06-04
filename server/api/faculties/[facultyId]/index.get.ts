import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { showFacultyEventHandlerFn } from '#server/features/faculties/faculty.show.handler';
import {
  FacultyParamsSchema,
  type ShowFacultyRequest,
} from '#shared/features/faculties';

export default defineEventHandler(
  new EventHandlerBuilder<ShowFacultyRequest>()
    .params(FacultyParamsSchema)
    .handle(showFacultyEventHandlerFn)
);
