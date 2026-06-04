import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { IndexFacultyRequest } from '#shared/features/faculties';

import { IndexFacultyAbility } from '#shared/features/faculties/faculty.ability';

export const indexFacultyEventHandlerFn: EventHandlerFn<
  IndexFacultyRequest
> = async ({ ability, query }) => {
  await ability.authorize(IndexFacultyAbility);

  return getFaculties(query);
};
