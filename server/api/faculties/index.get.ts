import { EventHandlerBuilder } from '#server/core/requests/eventHandlerBuilder';
import { indexFacultyEventHandlerFn } from '#server/features/faculties/faculty.index.handler';
import {
  FacultyQuerySchema,
  type IndexFacultyRequest,
} from '#shared/features/faculties';

export default defineEventHandler(
  new EventHandlerBuilder<IndexFacultyRequest>()
    .query(FacultyQuerySchema)
    .handle(indexFacultyEventHandlerFn)
);
