import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { ShowFacultyRequest } from '#shared/features/faculties';

import { ShowFacultyAbility } from '#shared/features/faculties/faculty.ability';

export const showFacultyEventHandlerFn: EventHandlerFn<
  ShowFacultyRequest
> = async ({ ability, params }) => {
  await ability.authorize(ShowFacultyAbility);

  const faculty = await getFaculty(params.facultyId);

  if (faculty === null) {
    throw Exception.notFound({ data: {} });
  }

  return { data: faculty };
};
