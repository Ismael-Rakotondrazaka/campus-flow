import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import {
  countFacultyEventHandlerFn,
  type CountFacultyRequest,
  FacultyCountQuerySchema,
} from '#server/features/faculties/faculty.count.handler';

export default defineEventHandler(
  new EventHandlerBuilder<CountFacultyRequest>()
    .query(FacultyCountQuerySchema)
    .handle(countFacultyEventHandlerFn)
);
